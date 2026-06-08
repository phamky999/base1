import { AppFilter } from '@/components/app-ui/app-filter';
import {
  FLIGHT_STATUS,
  FLIGHT_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { Form, Input } from 'antd';
import { useMemo } from 'react';

type TFlightListFilterProps = {
  showFilters?: boolean;
};

export const FlightListFilter = ({
  showFilters = true,
}: TFlightListFilterProps) => {
  const advanceFilterConfig = useMemo(
    () => ({
      keys: ['bookingCode', 'startPoint', 'endPoint', 'flightNumber'],
      elements: (
        <>
          <Form.Item
            name="flightNumber"
            label="Số hiệu chuyến bay"
            className="mb-3"
          >
            <Input placeholder="Số hiệu chuyến bay" />
          </Form.Item>

          <Form.Item name="bookingCode" label="Mã đặt chỗ" className="mb-3">
            <Input placeholder="Mã đặt chỗ" />
          </Form.Item>

          <Form.Item
            name="startPoint"
            label="Mã sân bay khởi hành"
            className="mb-3"
          >
            <Input placeholder="Mã sân bay khởi hành" />
          </Form.Item>

          <Form.Item
            name="endPoint"
            label="Mã sân bay hạ cánh"
            className="mb-3"
          >
            <Input placeholder="Mã sân bay hạ cánh" />
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
          key: 'airlineCode',
          placeholder: 'Mã hãng hàng không...',
        }}
        filters={
          showFilters
            ? [
                {
                  title: 'Trạng thái',
                  filterKey: 'status',
                  options: Object.values(FLIGHT_STATUS).map(value => ({
                    label: FLIGHT_STATUS_LABEL[value],
                    value: value,
                  })),
                },
              ]
            : []
        }
        advanceFilter={advanceFilterConfig}
      />
    </div>
  );
};
