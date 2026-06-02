import { useGetAircraftsQuery } from '@/features/flight-management/query';
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

  const options = useMemo(() => {
    return (aircraftsData?.data ?? []).map(item => ({
      label: item.name,
      value: item.name,
      searchText: item.name.toLowerCase(),
    }));
  }, [aircraftsData?.data]);

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <AutoComplete
        options={options}
        showSearch={{
          filterOption: (input, option) =>
            option?.searchText?.includes(input.toLowerCase()) || true,
        }}
        allowClear
        className="w-full"
        placeholder={placeholder || 'VD: VN '}
      />
    </Form.Item>
  );
};
