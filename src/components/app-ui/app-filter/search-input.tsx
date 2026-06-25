import { useQueryHandle } from '@/hooks/use-query-handle';
import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Input } from 'antd';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

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
  const { queryParams, handleUpdateQuery } = useQueryHandle();
  const searchValueFromUrl = queryParams[searchKey] != null ? String(queryParams[searchKey]) : '';

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

      handleUpdateQuery({
        [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
        [searchKey]: trimmedValue || undefined,
      });
    },
    [searchKey, handleUpdateQuery, searchValueFromUrl]
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
