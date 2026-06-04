import { useGetAircraftsQuery } from '@/features/flight-management/query';
import { useDebounceSearch } from '@/hooks/use-debounce-search';
import { AutoComplete, Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { useMemo } from 'react';

type TAircraftAutocompleteProps = {
  name: string | Array<string | number>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
};

export const AircraftAutocomplete = ({
  name,
  label,
  rules,
  placeholder,
}: TAircraftAutocompleteProps) => {
  const { data: aircraftsData } = useGetAircraftsQuery();

  const { debounceSearchFn, searchKeyword } = useDebounceSearch(0);

  const options = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return (aircraftsData?.data ?? [])
      .filter(item => {
        if (!keyword) return true;

        return item.name.toLowerCase().includes(keyword);
      })
      .map(item => ({
        label: item.name,
        value: item.name,
      }));
  }, [aircraftsData?.data, searchKeyword]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <AutoComplete
        options={options}
        showSearch={{
          filterOption: false,
          onSearch: debounceSearchFn,
        }}
        allowClear
        className="w-full"
        placeholder={placeholder || 'VD: VN '}
      />
    </Form.Item>
  );
};
