import { AppTable } from '@/components/app-table';
import { Button } from '@/components/ui/button';
import {
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import type { TFlightBookingStatus } from '@/features/flight-management/types';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import type { ObjectType } from '@/lib/types';
import { Tag, Tooltip, type TableProps } from 'antd';
import { EyeIcon, PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react';

export const FlightBookingList = () => {
  const columns: TableProps<ObjectType>['columns'] = [
    {
      title: 'Mã đơn',
      dataIndex: 'bookingCode',
      key: 'bookingCode',
      width: 150,
      render: value => (
        <span className="text-brand font-semibold">{value}</span>
      ),
    },
    {
      title: 'Hành khách',
      key: 'customer',
      width: 200,
      render: record => (
        <div className="space-y-0.5">
          <p className="font-semibold">{record?.customerName}</p>
          <Tooltip title={record?.customerEmail}>
            <p className="line-clamp-1 text-gray-400">
              {record?.customerEmail}
            </p>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Chuyến bay',
      key: 'flight',
      render: record => (
        <div className="space-y-0.5">
          <p className="font-semibold">{record?.flightNumber}</p>
          <p className="line-clamp-1 text-gray-400">{record?.airline} </p>
        </div>
      ),
    },
    {
      title: 'Hành trình',
      key: 'flight_route',
      render: record => (
        <div className="space-y-0.5">
          <div className="flex items-center justify-start gap-2">
            <span className="font-semibold">{record?.originAirport}</span>
            <span>→</span>
            <span className="font-semibold">{record?.destinationAirport}</span>
          </div>
          <p className="text-sm text-gray-400">{record?.aircraftType}</p>
        </div>
      ),
    },
    {
      title: 'Thời gian bay',
      key: 'flight_time',
      width: 200,
      render: record => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
            <span className="inline-block min-w-[130px]">
              {record?.departureTime} - {record?.departureDate}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
            <span className="inline-block min-w-[130px]">
              {record?.arrivalTime} - {record?.returnDate}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'bookedDate',
      key: 'bookedDate',
      width: 150,
    },

    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: TFlightBookingStatus) => (
        <div>
          <Tag
            className="px-2.5 py-1"
            color={FLIGHT_BOOKING_STATUS_COLOR[value]}
          >
            {FLIGHT_BOOKING_STATUS_LABEL[value]}
          </Tag>
        </div>
      ),
    },

    {
      title: <span className="pr-6">Giá</span>,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'right',
      width: 150,
      render: value => (
        <div className="pr-6">
          <span className="font-semibold tabular-nums">
            {formatDisplayCurrency(value)}
          </span>
        </div>
      ),
    },

    {
      title: 'Tác vụ',
      key: 'table_action',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: () => (
        <Tooltip title="Xem chi tiết">
          <Button variant="ghost">
            <EyeIcon className="size-4" />
          </Button>
        </Tooltip>
      ),
    },
  ];

  // Placeholder data - replace with actual data from API/props
  const dataSource = [
    {
      id: '1',
      bookingCode: 'BVN123456',
      customerName: 'Nguyễn Văn A',
      customerEmail: 'nguyenvana@gmail.com',
      airline: 'Vietnam Airlines',
      flightNumber: 'VN123',
      totalPrice: 2500000,
      departureDate: '2023-10-26',
      departureTime: '08:00',
      returnDate: '2023-10-27',
      arrivalTime: '10:00',
      status: 'CONFIRMED',
      originAirport: 'HAN',
      destinationAirport: 'SGN',
      aircraftType: 'A320',
      bookedDate: '2023-10-26',
    },
    {
      id: '2',
      bookingCode: 'BVN123457',
      customerName: 'Trần Thị B',
      customerEmail: 'tranthib@gmail.com',
      airline: 'Vietjet Air',
      flightNumber: 'VJ567',
      totalPrice: 1800000,
      departureDate: '2023-11-10',
      departureTime: '14:30',
      returnDate: '2023-11-11',
      arrivalTime: '16:00',
      status: 'PENDING',
      originAirport: 'HAN',
      destinationAirport: 'SGN',
      aircraftType: 'A320',
      bookedDate: '2023-10-26',
    },
    {
      id: '3',
      bookingCode: 'BVN123458',
      customerName: 'Lê Văn C',
      customerEmail: 'levanc@gmail.com',
      airline: 'Bamboo Airways',
      flightNumber: 'QH201',
      totalPrice: 3200000,
      departureDate: '2023-12-05',
      departureTime: '09:00',
      returnDate: '2023-12-06',
      arrivalTime: '11:15',
      status: 'CANCELLED',
      originAirport: 'HAN',
      destinationAirport: 'SGN',
      aircraftType: 'A320',
      bookedDate: '2023-10-26',
    },
  ];

  return (
    <AppTable<ObjectType>
      size="small"
      rowKey={record => record?.id}
      dataSource={dataSource}
      totalCount={dataSource?.length}
      columns={columns}
    />
  );
};
