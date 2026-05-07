import { AppFilter } from '@/components/app-filter';
import { AppLunarDatePicker } from '@/components/app-lunar-date-picker';
import {
  FLIGHT_STATUS_LABEL,
  FLIGHT_STATUS_OPTION,
} from '@/features/flight-management/constants';
import { DatePicker, Form, Input } from 'antd';
import { useMemo } from 'react';

export const FlightBookingListFilter = () => {
  const advanceFilterConfig = useMemo(
    () => ({
      keys: [
        'key1',
        'key2',
        'key3',
        'key4',
        'key5',
        'key6',
        'key7',
        'key8',
        'key9',
        'key10',
      ],
      elements: (
        <>
          <Form.Item name="key1" label="Key 1" className="mb-3">
            <Input placeholder="key1" />
          </Form.Item>
          <Form.Item name="key2" label="Key 2" className="mb-3">
            <Input placeholder="key2" />
          </Form.Item>
          <Form.Item name="key3" label="Key 3" className="mb-3">
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="key4" label="Key 4" className="mb-3">
            <DatePicker.RangePicker className="w-full" />
          </Form.Item>
          <Form.Item name="key5" label="Key 5" className="mb-3">
            <Input />
          </Form.Item>
          <Form.Item name="key6" label="Key 6" className="mb-3">
            <Input />
          </Form.Item>
          <Form.Item name="key7" label="Key 7" className="mb-3">
            <Input />
          </Form.Item>
          <Form.Item name="key8" label="Key 8" className="mb-3">
            <Input />
          </Form.Item>
          <Form.Item name="key9" label="Key 9" className="mb-3">
            <Input />
          </Form.Item>
          <Form.Item name="key10" label="Key 10" className="mb-3">
            <AppLunarDatePicker className="w-full" />
          </Form.Item>
        </>
      ),
    }),
    []
  );

  return (
    <div>
      <AppFilter
        searchField={{
          key: 'keyword',
          placeholder: 'Nhập từ khoá ',
        }}
        filters={[
          {
            title: 'Trạng thái',
            filterKey: 'status',
            options: Object.values(FLIGHT_STATUS_OPTION).map(value => ({
              label: FLIGHT_STATUS_LABEL[value],
              value: value,
            })),
          },
        ]}
        advanceFilter={advanceFilterConfig}
      />
    </div>
  );
};
