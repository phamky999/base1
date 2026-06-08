import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Input } from 'antd';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type TQuickFilterSearchInputProps = {
  searchKey: string;
  placeholder?: string;
  debounceMs?: number;
  inputClassName?: string;
};

export const QuickFilterSearchInput = ({
  placeholder = 'Nhập từ khóa tìm kiếm...',
  searchKey,
  debounceMs = 500,
  inputClassName,
}: TQuickFilterSearchInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueFromUrl = searchParams.get(searchKey) || '';

  const [inputValue, setInputValue] = useState(searchValueFromUrl);

  const [prevUrlValue, setPrevUrlValue] = useState(searchValueFromUrl);

  if (searchValueFromUrl !== prevUrlValue) {
    setInputValue(searchValueFromUrl);
    setPrevUrlValue(searchValueFromUrl);
  }

  const handleUpdateSearchParams = useCallback(
    (value: string) => {
      const trimmedValue = value.trim();

      if (trimmedValue === searchValueFromUrl) return;

      setSearchParams(
        prev => {
          const newParams = new URLSearchParams(prev);

          if (trimmedValue) {
            newParams.set(searchKey, trimmedValue);
          } else {
            newParams.delete(searchKey);
          }

          newParams.set(
            PAGINATION_QUERY_KEY.PAGE_INDEX,
            String(DEFAULT_PAGE_INDEX)
          );

          return newParams;
        },
        { replace: true }
      );
    },
    [searchKey, setSearchParams, searchValueFromUrl]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleUpdateSearchParams(inputValue);
    }, debounceMs);

    return () => clearTimeout(timeout);
  }, [inputValue, handleUpdateSearchParams, debounceMs]);

  return (
    <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      allowClear
      suffix={<SearchIcon size={16} />}
      className={cn(inputClassName, 'w-50')}
    />
  );
};
