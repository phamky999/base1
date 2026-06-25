import { useQueryHandle } from '@/hooks/use-query-handle';
import { useEffect } from 'react';

type UseConsumeSearchParamsProps = {
  key: string;
  value?: string;
  onConsume: () => void;
};

export const useConsumeSearchParams = ({
  key,
  value,
  onConsume,
}: UseConsumeSearchParamsProps) => {
  const { queryParams, handleUpdateQuery } = useQueryHandle();

  useEffect(() => {
    const currentValue = queryParams[key];

    const shouldConsume =
      value === undefined ? currentValue != null : currentValue === value;

    if (!shouldConsume) {
      return;
    }

    onConsume();

    handleUpdateQuery({ [key]: undefined });
  }, [key, value, onConsume, queryParams, handleUpdateQuery]);
};
