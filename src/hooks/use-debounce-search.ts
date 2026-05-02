import { debounce } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

export const useDebounceSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const debounceSearchFn = useMemo(
    () =>
      debounce((value: string) => {
        setSearchKeyword(value);
      }, 500),
    []
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
