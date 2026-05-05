import { getPagePath } from '@/app/router/app-router-paths';
import { AppTable } from '@/components/app-table';
import {
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
  mockFlightList,
} from '@/features/flight-management/constants';
import type {
  TFlightListItem,
  TFlightStatus,
} from '@/features/flight-management/types';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import dayjs from '@/lib/date/dayjs-config';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Button, Tag, Tooltip, type TableProps } from 'antd';
import { ClipboardListIcon, SquarePenIcon, UsersRoundIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FlightList = () => {
  const navigate = useNavigate();

  const columns: TableProps<TFlightListItem>['columns'] = [
    {
      title: 'Chuyến bay',
      key: 'flight_info',
      render: (record: TFlightListItem) => (
        <div>
          <p className="font-semibold">{record?.flightNumber}</p>
          <p className="text-sm text-gray-400">{record?.airline}</p>
        </div>
      ),
    },
    {
      title: 'Hành trình',
      key: 'flight_route',
      render: (record: TFlightListItem) => (
        <div>
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
      render: (record: TFlightListItem) => (
        <div>
          <p className="font-semibold">
            {dayjs(record?.departureDate).format(DEFAULT_DATE_FORMAT)}
          </p>
          <div className="flex items-center justify-start gap-0.5 text-gray-400">
            <span>{record?.departureTime}</span>-
            <span>{record?.arrivalTime}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Số lượng vé',
      key: 'flight_seat',
      render: (record: TFlightListItem) => (
        <div className="space-y-1">
          <div className="flex items-center justify-start gap-1">
            <UsersRoundIcon className="size-4 text-gray-400" />
            <span>
              {record?.seat?.available} / {record?.seat?.total}
            </span>
          </div>
          {record?.seat?.available === 0 && (
            <Tag className="rounded-md bg-red-600 px-2.5 text-white">
              Hết chỗ
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Giá ',
      dataIndex: 'price',
      key: 'price',
      render: value => (
        <span className="font-semibold">{formatDisplayCurrency(value)}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: TFlightStatus) => (
        <Tag className="px-2.5 py-1" color={FLIGHT_STATUS_COLOR[value]}>
          {FLIGHT_STATUS_LABEL[value]}
        </Tag>
      ),
    },
    {
      title: 'Tác vụ',
      key: 'table_action',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (record: TFlightListItem) => (
        <>
          <Tooltip title="Xem danh sách booking">
            <Button
              onClick={() =>
                navigate({
                  pathname: getPagePath('flightBookingListPage'),
                  search: `flightId=${record?.id}`,
                })
              }
              type="text"
              shape="circle"
              icon={<ClipboardListIcon className="size-4" />}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa chuyến bay">
            <Button
              onClick={() =>
                navigate(getPagePath('flightDetailPage', record?.id))
              }
              type="text"
              shape="circle"
              icon={<SquarePenIcon className="size-4" />}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <AppTable<TFlightListItem>
      size="small"
      rowKey={record => record?.id}
      dataSource={mockFlightList}
      totalCount={mockFlightList?.length}
      columns={columns}
    />
  );
};
