import { AppFilter } from '@/components/app-ui/app-filter';
import {
  FLIGHT_BOOKING_STATUS,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import { DatePicker, Form, Input } from 'antd';

const ADVANCE_FILTER_KEYS = [
  'airlineCode',
  'startPoint',
  'endPoint',
  'flightDate',
  'bookingCode',
  'merchantCode',
];

const statusFilterOptions = Object.values(FLIGHT_BOOKING_STATUS).map(value => ({
  label: FLIGHT_BOOKING_STATUS_LABEL[value],
  value: value,
}));

export const FlightBookingListFilter = () => {
  return (
    <div>
      <AppFilter
        searchField={{
          key: 'transactionCode',
          placeholder: 'Nhập mã đơn hàng',
        }}
        filters={[
          {
            title: 'Trạng thái',
            filterKey: 'status',
            options: statusFilterOptions,
          },
        ]}
        advanceFilter={{
          keys: ADVANCE_FILTER_KEYS,
          elements: (
            <>
              <Form.Item
                name="merchantCode"
                label="Mã kênh bán"
                className="mb-3"
              >
                <Input placeholder="Mã kênh bán" />
              </Form.Item>
              <Form.Item name="bookingCode" label="Mã đặt chỗ" className="mb-3">
                <Input placeholder="Mã đặt chỗ" />
              </Form.Item>
              <Form.Item
                name="airlineCode"
                label="Mã hãng hàng không"
                className="mb-3"
              >
                <Input placeholder="Mã hãng hàng không" />
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
              <Form.Item name="flightDate" label="Ngày bay" className="mb-3">
                <DatePicker
                  className="w-full"
                  placeholder="Ngày bay"
                  format={DEFAULT_DATE_FORMAT}
                />
              </Form.Item>
            </>
          ),
        }}
      />
    </div>
  );
};
