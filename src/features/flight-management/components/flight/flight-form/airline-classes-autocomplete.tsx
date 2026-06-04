import { useGetAirlineClassesQuery } from '@/features/flight-management/query';
import { cn } from '@/lib/utils';
import { Empty, Form, Input, Popover, type InputRef } from 'antd';
import type { Rule } from 'antd/es/form';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from 'react';

type AirlineClassesAutocompleteProps = {
  name: string | Array<string | number>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  airlineCode?: string;
};

type AirlineClassesSelectionProps = {
  value?: string;
  onChange?: (value: string) => void;
  airlineCode?: string;
  placeholder?: string;
};

const AirlineClassesSelection = ({
  value,
  onChange,
  airlineCode,
  placeholder,
}: AirlineClassesSelectionProps) => {
  const { data: listAirlineClassesData } = useGetAirlineClassesQuery();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [popupWidth, setPopupWidth] = useState(300);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const classes = useMemo(() => {
    const data = listAirlineClassesData?.data ?? {};

    if (airlineCode && data[airlineCode]) {
      return data[airlineCode];
    }

    return Object.values(data).flat();
  }, [airlineCode, listAirlineClassesData?.data]);

  const filteredClasses = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    if (!keyword) {
      return classes;
    }

    return classes.filter(item => {
      return item.bookingClass.toLowerCase().includes(keyword);
    });
  }, [classes, searchKeyword]);

  const selectItem = useCallback(
    (bookingClass: string) => {
      onChange?.(bookingClass);
      setSearchKeyword(bookingClass);
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    },
    [onChange]
  );

  // Scroll active item vào tầm nhìn khi dùng keyboard
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isDropdownOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          setIsDropdownOpen(true);
          setActiveIndex(0);
          e.preventDefault();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex(prev =>
            prev < filteredClasses.length - 1 ? prev + 1 : 0
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex(prev =>
            prev > 0 ? prev - 1 : filteredClasses.length - 1
          );
          break;

        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && filteredClasses[activeIndex]) {
            selectItem(filteredClasses[activeIndex].bookingClass);
          }
          break;

        case 'Escape':
          e.preventDefault();
          setIsDropdownOpen(false);
          setActiveIndex(-1);
          inputRef.current?.blur();
          break;

        case 'Tab':
          setIsDropdownOpen(false);
          setActiveIndex(-1);
          break;
      }
    },
    [isDropdownOpen, filteredClasses, activeIndex, selectItem]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;

      onChange?.(raw);
      setSearchKeyword(raw);
      setActiveIndex(-1);
      setIsDropdownOpen(true);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    setIsDropdownOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Dùng timeout ngắn để cho phép click vào item trong dropdown hoàn tất trước
    setTimeout(() => {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }, 150);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const observer = new ResizeObserver(entries => {
      const width = entries[0].contentRect.width;
      setPopupWidth(width);
    });

    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  const popoverContent = (
    <div
      ref={listRef}
      style={{ width: popupWidth - 8 }}
      className="max-h-64 overflow-y-auto"
    >
      {!filteredClasses?.length && <Empty />}
      {(filteredClasses || []).map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`${item.airlineCode}_${item.bookingClass}_${item.cabinClass}`}
            data-index={index}
            type="button"
            className={cn(
              'w-full rounded-sm px-3 py-2 text-left',
              isActive && 'bg-[#f5f5f5] dark:bg-[#ffffff14]'
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(-1)}
            onMouseDown={e => {
              // Ngăn input blur trước khi click được xử lý
              e.preventDefault();
            }}
            onClick={() => selectItem(item.bookingClass)}
          >
            <p className="text-sm">
              Hạng: <span className="font-semibold">{item.bookingClass}</span>
            </p>

            <p className="text-xs text-muted-foreground">
              {item.airlineCode} • {item.cabinClass}
            </p>
          </button>
        );
      })}
    </div>
  );

  return (
    <Popover
      open={isDropdownOpen}
      content={popoverContent}
      arrow={false}
      trigger={[]}
      classNames={{
        container: 'p-1',
      }}
    >
      <div ref={wrapperRef}>
        <Input
          ref={inputRef as Ref<InputRef>}
          value={value}
          placeholder={placeholder || 'VD: B'}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onClick={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
      </div>
    </Popover>
  );
};

export const AirlineClassesAutocomplete = ({
  name,
  label,
  rules,
  placeholder,
  airlineCode,
}: AirlineClassesAutocompleteProps) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <AirlineClassesSelection
        placeholder={placeholder}
        airlineCode={airlineCode}
      />
    </Form.Item>
  );
};
