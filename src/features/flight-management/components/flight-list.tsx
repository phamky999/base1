import { getPagePath } from '@/app/router/app-router-paths';
import { AppTable } from '@/components/app-table';
import { Button } from '@/components/ui/button';
import {
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
  mockFlightList,
} from '@/features/flight-management/constants';
import type {
  TFlightListItem,
  TFlightStatus,
} from '@/features/flight-management/types';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Tag, Tooltip, type TableProps } from 'antd';
import {
  ClipboardListIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  SquarePenIcon,
  UsersRoundIcon,
} from 'lucide-react';
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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: TFlightStatus) => (
        <div>
          <Tag className="px-2.5 py-1" color={FLIGHT_STATUS_COLOR[value]}>
            {FLIGHT_STATUS_LABEL[value]}
          </Tag>
        </div>
      ),
    },
    {
      title: <span className="pr-6">Giá</span>,
      dataIndex: 'price',
      key: 'price',
      align: 'right',
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
              variant={'ghost'}
            >
              <ClipboardListIcon className="size-4" />
            </Button>
          </Tooltip>
          <Tooltip title="Chỉnh sửa chuyến bay">
            <Button
              onClick={() =>
                navigate(getPagePath('flightDetailPage', record?.id))
              }
              variant={'ghost'}
            >
              <SquarePenIcon className="size-4" />
            </Button>
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
