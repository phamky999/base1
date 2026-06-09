import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

type QuickFilterSelectionProps = {
  title?: string;
  type?: 'multiple' | 'single';
  filterKey: string;
  options: {
    label: string;
    value: string;
  }[];
};

export const QuickFilterSelection = ({
  title,
  filterKey,
  options,
  type = 'single',
}: QuickFilterSelectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedValues = useMemo(() => {
    return new Set(searchParams.getAll(filterKey));
  }, [searchParams, filterKey]);

  const handleSelect = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (type === 'single') {
      const currentValue = newParams.get(filterKey);

      newParams.delete(filterKey);

      if (currentValue !== value) {
        newParams.set(filterKey, value);
      }

      setSearchParams(newParams, { replace: true });
      return;
    }

    const currentFilters = new Set(newParams.getAll(filterKey));

    if (currentFilters.has(value)) {
      currentFilters.delete(value);
    } else {
      currentFilters.add(value);
    }

    newParams.delete(filterKey);
    currentFilters.forEach(val => {
      newParams.append(filterKey, val);
    });

    newParams.set(PAGINATION_QUERY_KEY.PAGE_INDEX, String(DEFAULT_PAGE_INDEX));

    setSearchParams(newParams, { replace: true });
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(filterKey);
    setSearchParams(newParams, { replace: true });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircleIcon className="mr-2 size-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} đã chọn
                  </Badge>
                ) : (
                  options
                    .filter(option => selectedValues.has(option.value))
                    .map(option => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div
                      className={cn(
                        'mr-2 flex size-4 items-center justify-center rounded-[4px] border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>

                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {selectedValues.size > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={clearFilters}
                  className="justify-center text-center"
                >
                  <span className="flex-1">
                    {type === 'single' ? 'Bỏ chọn' : 'Bỏ chọn tất cả'}
                  </span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};
