import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { AppTable } from '@/components/app-table';
import { BookingDetailActionGroups } from '@/features/flight-management/components/flight-booking/booking-detail-action-groups';
import {
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightBookingListQuery } from '@/features/flight-management/query';
import type {
  TFlightBookingListItem,
  TFlightBookingStatus,
  TGetFlightBookingListRequestParams,
} from '@/features/flight-management/types';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Tag, Tooltip, type TableProps } from 'antd';
import { EyeIcon, PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BookingDetailDrawer } from './booking-detail-drawer';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const FlightBookingList = () => {
  const { getApiQueryParamsFromUrlQuery } =
    useQueryHandle<TGetFlightBookingListRequestParams>();

  const [selectedId, setSelectedId] = useState<string>();
  const [openDetail, setOpenDetail] = useState(false);

  const params = getApiQueryParamsFromUrlQuery({
    keys: [
      'status',
      'airlineCode',
      'bookingCode',
      'startPoint',
      'endPoint',
      'flightId',
      'flightDate',
    ],
  });

  const { data, isFetching } = useGetFlightBookingListQuery(
    params as TGetFlightBookingListRequestParams
  );

  const handleRowClick = (record: TFlightBookingListItem) => {
    setSelectedId(record.id);
    setOpenDetail(true);
  };

  const columns: TableProps<TFlightBookingListItem>['columns'] = useMemo(() => {
    return [
      {
        title: 'Mã đặt chỗ',
        dataIndex: 'bookingCode',
        key: 'bookingCode',
        width: 150,
        render: value => (
          <span className="text-brand font-semibold">{value}</span>
        ),
      },
      {
        title: 'Chuyến bay',
        key: 'flight_route',
        width: 180,
        render: record => (
          <div className="space-y-0.5">
            <div> {record?.airlineName}</div>
            <div className="flex items-center justify-start gap-2 text-xs">
              <span>{record?.startPoint}</span>
              <span>→</span>
              <span>{record?.endPoint}</span>
            </div>
          </div>
        ),
      },
      {
        title: 'Thời gian bay',
        width: 200,
        key: 'flight_time',
        render: (record: TFlightBookingListItem) => (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
              <span className="inline-block min-w-[130px]">
                <AppDateTimeLabel value={record?.startDate} />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
              <span className="inline-block min-w-[130px]">
                <AppDateTimeLabel value={record?.endDate} />
              </span>
            </div>
          </div>
        ),
      },
      {
        title: 'Khách hàng',
        key: 'customer',
        width: 200,
        render: record => (
          <div className="space-y-0.5">
            <p className="font-semibold">{record?.contactName}</p>
            <Tooltip title={record?.contactEmail}>
              <p className="line-clamp-1 text-xs text-gray-400">
                {record?.contactEmail}
              </p>
            </Tooltip>
          </div>
        ),
      },
      {
        title: 'Số lượng vé',
        key: 'totalTickets',
        width: 120,
        render: (record: TFlightBookingListItem) =>
          (record?.adult || 0) +
          (record?.children || 0) +
          (record?.infant || 0),
      },
      {
        title: 'Ngày đặt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: (value: string) => (
          <AppDateTimeLabel value={value} showTime={true} />
        ),
      },
      {
        title: 'Hạn thanh toán',
        dataIndex: 'lastTicketDate',
        key: 'lastTicketDate',
        width: 150,
        render: (value: string) => (
          <AppDateTimeLabel value={value} showTime={true} />
        ),
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (value: TFlightBookingStatus) => (
          <div>
            <Tag
              variant="outlined"
              className="px-2.5 py-1"
              color={FLIGHT_BOOKING_STATUS_COLOR[value]}
            >
              {FLIGHT_BOOKING_STATUS_LABEL[value]}
            </Tag>
          </div>
        ),
      },
      {
        title: <span className="pr-6">Tổng giá</span>,
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
        render: (record: TFlightBookingListItem) => (
          <BookingDetailActionGroups
            bookingId={record.id}
            addon={
              <DropdownMenuItem onClick={() => handleRowClick(record)}>
                <span className="mb-0.5">
                  <EyeIcon />
                </span>
                Xem chi tiết
              </DropdownMenuItem>
            }
          />
        ),
      },
    ];
  }, []);

  return (
    <>
      <AppTable<TFlightBookingListItem>
        size="small"
        rowKey={record => record?.id}
        dataSource={data?.data?.items}
        totalCount={data?.data?.totalItems}
        columns={columns}
        loading={isFetching}
        onRow={record => ({
          onClick: () => handleRowClick(record),
          className: 'cursor-pointer',
        })}
      />
      <BookingDetailDrawer
        bookingId={selectedId}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />
    </>
  );
};
