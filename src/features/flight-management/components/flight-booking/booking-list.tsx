import { AppDateTimeLabel } from '@/components/app-ui/app-date-time-label';
import { AppTable } from '@/components/app-ui/app-table';
import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { BookingDetailActionGroups } from '@/features/flight-management/components/flight-booking/booking-detail-action-groups';
import {
  FLIGHT_BOOKING_SORT_KEY,
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
import { Tag, type TableProps } from 'antd';
import { PlaneLandingIcon, PlaneTakeoffIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BookingDetailDrawer } from './booking-detail-drawer';

export const FlightBookingList = () => {
  const {
    getApiQueryParamsFromUrlQuery,
    handleTableSort,
    pagination,
    sortData,
  } = useQueryHandle<TGetFlightBookingListRequestParams>();

  const [selectedId, setSelectedId] = useState<string>();
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const filterParams = getApiQueryParamsFromUrlQuery({
    keys: [
      'status',
      'airlineCode',
      'bookingCode',
      'startPoint',
      'endPoint',
      'flightId',
      'flightDate',
      'transactionCode',
      'merchantCode',
    ],
    noPagination: true,
    noSort: true,
  }) as TGetFlightBookingListRequestParams;

  const { data, isFetching } = useGetFlightBookingListQuery({
    ...filterParams,
    ...sortData,
    ...pagination,
  } as TGetFlightBookingListRequestParams);

  const handleRowClick = (record: TFlightBookingListItem) => {
    setSelectedId(record.id);
    setIsDetailDrawerOpen(true);
  };

  const columns: TableProps<TFlightBookingListItem>['columns'] = useMemo(() => {
    return [
      {
        title: 'Mã đơn hàng',
        dataIndex: 'transactionCode',
        key: 'transactionCode',
        width: 150,
        render: value => <p className="font-semibold">{value}</p>,
      },
      {
        title: 'Mã đặt chỗ',
        dataIndex: 'bookingCode',
        key: 'bookingCode',
        width: 140,
        render: value => <span className="font-semibold">{value}</span>,
      },
      {
        title: 'Mã chuyến bay',
        dataIndex: 'flightTransactionCode',
        key: 'flightTransactionCode',
        width: 140,
        render: value => <span className="font-semibold">{value}</span>,
      },
      {
        title: 'Chuyến bay',
        key: 'flight_route',
        width: 180,
        render: record => (
          <div className="space-y-0.5">
            <div>{record?.airlineName}</div>
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
        key: FLIGHT_BOOKING_SORT_KEY.START_DATE,
        sorter: true,
        render: (record: TFlightBookingListItem) => (
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <PlaneTakeoffIcon className="size-3.5 shrink-0 text-gray-400" />
              <span className="inline-block min-w-32.5">
                <AppDateTimeLabel value={record?.startDate} />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <PlaneLandingIcon className="size-3.5 shrink-0 text-gray-400" />
              <span className="inline-block min-w-32.5">
                <AppDateTimeLabel value={record?.endDate} />
              </span>
            </div>
          </div>
        ),
      },
      {
        title: <span className="pr-6">Tổng tiền</span>,
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
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (value: TFlightBookingStatus) => (
          <div>
            <Tag
              variant="outlined"
              className="px-2.5 py-0.5"
              color={FLIGHT_BOOKING_STATUS_COLOR[value]}
            >
              {FLIGHT_BOOKING_STATUS_LABEL[value]}
            </Tag>
          </div>
        ),
      },

      {
        title: 'Hạn thanh toán',
        dataIndex: 'lastTicketDate',
        key: 'lastTicketDate',
        width: 160,
        render: (value: string) => (
          <AppDateTimeLabel value={value} showTime={true} />
        ),
      },

      {
        title: 'Ngày tạo',
        width: 180,
        key: FLIGHT_BOOKING_SORT_KEY.CREATED_AT,
        sorter: true,
        render: (record: TFlightBookingListItem) => (
          <AppDateTimeLabel value={record?.createdAt} showTime={false} />
        ),
      },

      {
        title: 'Số khách',
        key: 'totalTickets',
        width: 100,
        render: (record: TFlightBookingListItem) =>
          (record?.adult || 0) +
          (record?.children || 0) +
          (record?.infant || 0),
      },

      {
        title: 'Kênh bán',
        key: 'merchant',
        width: 180,
        render: record => (
          <div className="space-y-0.5">
            <AppTooltip
              content={
                <div>
                  <p>{record?.merchantCode}</p>
                  <span>{record?.merchantName}</span>
                </div>
              }
            >
              <div>
                <p className="line-clamp-1 max-w-40 font-semibold">
                  {record?.merchantCode}
                </p>
                <p className="line-clamp-1 max-w-40 text-xs text-gray-400">
                  {record?.merchantName}
                </p>
              </div>
            </AppTooltip>
          </div>
        ),
      },

      {
        title: 'Tác vụ',
        key: 'table_action',
        fixed: 'right',
        width: 100,
        render: (record: TFlightBookingListItem) => (
          <div onClick={e => e.stopPropagation()}>
            <BookingDetailActionGroups booking={record} />
          </div>
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
        isShowSkeleton={isFetching}
        onRow={record => ({
          onClick: () => handleRowClick(record),
          className: 'cursor-pointer',
        })}
        onChange={(_, __, sorter, extra) => {
          if (extra.action === 'sort') {
            const { order, columnKey } = (sorter || {}) as {
              order?: string;
              columnKey?: string;
            };

            handleTableSort({ order, columnKey });
          }
        }}
      />
      <BookingDetailDrawer
        bookingId={selectedId}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
    </>
  );
};
