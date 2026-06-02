import { debounce } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

export const useDebounceSearch = (delay = 500) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const debounceSearchFn = useMemo(
    () =>
      debounce((value: string) => {
        setSearchKeyword(value);
      }, delay),
    [delay]
  );

  useEffect(() => {
    return () => {
      debounceSearchFn.cancel();
    };
  }, [debounceSearchFn]);

  return {
    searchKeyword,
    setSearchKeyword,
    debounceSearchFn,
  };
};
