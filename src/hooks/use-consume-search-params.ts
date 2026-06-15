import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type UseConsumeSearchParamsProps = {
  key: string;
  value?: string;
  onConsume: () => void;
  replace?: boolean;
};

export const useConsumeSearchParams = ({
  key,
  value,
  onConsume,
  replace = true,
}: UseConsumeSearchParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentValue = searchParams.get(key);

    const shouldConsume =
      value === undefined ? currentValue !== null : currentValue === value;

    if (!shouldConsume) {
      return;
    }

    onConsume();

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);

    setSearchParams(newParams, { replace });
  }, [key, value, onConsume, searchParams, setSearchParams, replace]);
};
