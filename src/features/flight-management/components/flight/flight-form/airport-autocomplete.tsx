import { useSearchAirportsQuery } from '@/features/flight-management/query';
import type { TAirportItem } from '@/features/flight-management/types';
import { useDebounceSearch } from '@/hooks/use-debounce-search';
import { upperCaseValue } from '@/lib/helpers/string';
import { AutoComplete, Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { useMemo } from 'react';

type AirportAutocompleteProps = {
  name: string | Array<string | number>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
};

export const AirportAutocomplete = ({
  name,
  label,
  rules,
  placeholder,
}: AirportAutocompleteProps) => {
  const { searchKeyword, setSearchKeyword, debounceSearchFn } =
    useDebounceSearch();
  const { data: searchAirportsData } = useSearchAirportsQuery({
    keyword: searchKeyword,
  });

  const options = useMemo(() => {
    return (searchAirportsData?.data || [])?.map((item: TAirportItem) => ({
      label: `${item.code} - ${item.name}`,
      value: item.code,
    }));
  }, [searchAirportsData]);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      normalize={upperCaseValue}
    >
      <AutoComplete
        options={options}
        placeholder={placeholder || 'VD: HAN...'}
        allowClear
        onClear={() => {
          setSearchKeyword('');
        }}
        showSearch={{
          onSearch: debounceSearchFn,
        }}
        className="w-full"
      />
    </Form.Item>
  );
};
