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
import { useQueryHandle } from '@/hooks/use-query-handle';

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
  const { queryParams, handleUpdateQuery } = useQueryHandle();

  const selectedValues = useMemo(() => {
    const value = queryParams[filterKey];
    const arr = value == null ? [] : Array.isArray(value) ? value : [value];
    return new Set(arr);
  }, [queryParams, filterKey]);

  const handleSelect = (value: string) => {
    if (type === 'single') {
      const currentValue = queryParams[filterKey];

      handleUpdateQuery({
        [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
        [filterKey]: currentValue === value ? undefined : value,
      });
      return;
    }

    const currentValue = queryParams[filterKey];
    const currentFilters = new Set(
      currentValue == null ? [] : Array.isArray(currentValue) ? currentValue : [currentValue]
    );

    if (currentFilters.has(value)) {
      currentFilters.delete(value);
    } else {
      currentFilters.add(value);
    }

    const newValues = Array.from(currentFilters);

    handleUpdateQuery({
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
      [filterKey]: newValues.length > 0 ? newValues : undefined,
    });
  };

  const clearFilters = () => {
    handleUpdateQuery({
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
      [filterKey]: undefined,
    });
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
