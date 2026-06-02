import { useGetAirlinesQuery } from '@/features/flight-management/query';
import { upperCaseValue } from '@/lib/helpers/string';
import { AutoComplete, Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { useMemo } from 'react';

type AirlineAutocompleteProps = {
  name: string | Array<string | number>;
  label?: string;
  rules?: Rule[];
  placeholder?: string;
  priorityCodes?: string[];
};

const PRIORITY_CODES = ['VN', 'VJ', '9G', 'QH', 'VU', 'BL', '0V'];

export const AirlineAutocomplete = ({
  name,
  label,
  rules,
  placeholder,
  priorityCodes = PRIORITY_CODES,
}: AirlineAutocompleteProps) => {
  const { data: listAirlineData } = useGetAirlinesQuery();

  const sortedAirlines = useMemo(() => {
    const airlines = listAirlineData?.data ?? [];

    const priorityMap = new Map(
      priorityCodes.map((code, index) => [code, index])
    );

    return [...airlines].sort((a, b) => {
      const aIndex = priorityMap.get(a.code);
      const bIndex = priorityMap.get(b.code);

      const aIsPriority = aIndex !== undefined;
      const bIsPriority = bIndex !== undefined;

      if (aIsPriority && bIsPriority) {
        return aIndex - bIndex;
      }

      if (aIsPriority) {
        return -1;
      }

      if (bIsPriority) {
        return 1;
      }

      return 0;
    });
  }, [listAirlineData?.data, priorityCodes]);

  const options = useMemo(() => {
    return sortedAirlines.map(item => ({
      label: `${item.code} - ${item.name}`,
      value: item.code,
      searchText: `${item.code} ${item.name}`.toLowerCase(),
    }));
  }, [sortedAirlines]);

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
