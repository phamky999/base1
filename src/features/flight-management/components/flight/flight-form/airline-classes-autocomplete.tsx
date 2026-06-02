import { useGetAirlineClassesQuery } from '@/features/flight-management/query';
import type { TAirlineClassItem } from '@/features/flight-management/types';
import { upperCaseValue } from '@/lib/helpers/string';
import { AutoComplete, Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { useMemo } from 'react';

type AirlineClassesAutocompleteProps = {
  name: string | Array<string | number>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  airlineCode?: string;
};

export const AirlineClassesAutocomplete = ({
  name,
  label,
  rules,
  placeholder,
  airlineCode,
}: AirlineClassesAutocompleteProps) => {
  const { data: listAirlineClassesData } = useGetAirlineClassesQuery();

  const options = useMemo(() => {
    const data = listAirlineClassesData?.data ?? {};
    let classes: TAirlineClassItem[];
    if (airlineCode && data[airlineCode]) {
      classes = data[airlineCode];
    } else {
      classes = Object.values(data).flat();
    }

    // loại duplicate bookingClass khi flatten
    const uniqueClasses = Array.from(
      new Map(classes.map(item => [item.bookingClass, item])).values()
    ).sort((a, b) => a.bookingClass.localeCompare(b.bookingClass));

    return uniqueClasses.map(item => ({
      label: item.bookingClass,
      value: item.bookingClass,
      searchText: item.bookingClass.toLowerCase(),
    }));
  }, [airlineCode, listAirlineClassesData?.data]);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      normalize={upperCaseValue}
    >
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
