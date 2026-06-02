import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { AppTable } from '@/components/app-table';
import { FlightDetailActionGroups } from '@/features/flight-management/components/flight/flight-detail-action-groups';
import { FlightStatistics } from '@/features/flight-management/components/flight/flight-statistics';
import {
  FLIGHT_ITINERARY_TYPE,
  FLIGHT_STATUS,
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
  GET_FLIGHT_FILTER_KEYS,
} from '@/features/flight-management/constants';
import {
  useGetFlightListQuery,
  useGetFlightStaticsQuery,
} from '@/features/flight-management/query';
import type {
  TFlightListItem,
  TFlightStatus,
  TGetFlightListRequestParams,
} from '@/features/flight-management/types';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { Tag, type TableProps } from 'antd';
import {
  MoveHorizontalIcon,
  MoveRightIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { FlightDetailDrawer } from './flight-detail-drawer';
import { FlightListFilter } from '@/features/flight-management/components/flight/flight-list-filter';
import { Button } from '@/components/ui/button';

type FlightListProps = {
  showInSelectFlightDrawer?: boolean;
  showFlightActiveOnly?: boolean;
  customOnSelectRecord?: (record: TFlightListItem) => void;
};

export const FlightList = ({
  showInSelectFlightDrawer = false,
  showFlightActiveOnly = false,
  customOnSelectRecord,
}: FlightListProps) => {
  const [selectedFlightId, setSelectedFlightId] = useState<string>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { getApiQueryParamsFromUrlQuery, pagination } =
    useQueryHandle<TGetFlightListRequestParams>();

  const params = getApiQueryParamsFromUrlQuery({
    keys: GET_FLIGHT_FILTER_KEYS,
    noPagination: true,
  }) as TGetFlightListRequestParams;

  const { data, isFetching } = useGetFlightListQuery(
    {
      ...params,
      ...(showFlightActiveOnly && { status: FLIGHT_STATUS.ACTIVE }),
      ...pagination,
    } as TGetFlightListRequestParams,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: statisticsDataResponse, isFetching: isFetchingStatistics } =
    useGetFlightStaticsQuery(
      {
        ...params,
      } as TGetFlightListRequestParams,
      {
        refetchOnMountOrArgChange: true,
        skip: showInSelectFlightDrawer,
      }
    );

  const { items: flightList, totalItems } = data?.data || {};

  const handleViewDetail = (record: TFlightListItem) => {
    setSelectedFlightId(record.id);
    setIsDrawerOpen(true);
  };

  const columns = useMemo(
    (): TableProps<TFlightListItem>['columns'] => [
      {
        title: 'Chuyến bay',
        width: 180,
        key: 'flight_info',
        render: (record: TFlightListItem) => (
          <div>
            <p className="font-semibold">{record?.airlineName}</p>
            <p className="text-xs text-gray-400">
              {record?.flightNumbers?.join(', ')}
            </p>
          </div>
        ),
      },
      {
        title: 'Mã đặt chỗ',
        width: 150,
        key: 'flight_bookingCode',
        render: (record: TFlightListItem) => (
          <div>
            <p className="font-semibold">{record?.bookingCode}</p>
          </div>
        ),
      },
      {
        title: 'Hành trình',
        width: 200,
        key: 'flight_route',
        render: (record: TFlightListItem) => (
          <div>
            <div className="flex items-center justify-start gap-2">
              <span className="font-semibold">{record?.startPoint}</span>
              {record?.itineraryType === FLIGHT_ITINERARY_TYPE.ROUND_TRIP ? (
                <MoveHorizontalIcon className="size-4" />
              ) : (
                <MoveRightIcon className="size-4" />
              )}
              <span className="font-semibold">{record?.endPoint}</span>
            </div>
            <p className="text-xs text-gray-400">
              {record?.planes?.join(', ')}
            </p>
          </div>
        ),
      },
      {
        title: 'Thời gian bay',
        width: 200,
        key: 'flight_time',
        render: (record: TFlightListItem) => (
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
        title: 'Số lượng ghế',
        width: 120,
        key: 'flight_seat',
        render: (record: TFlightListItem) => (
          <div className="space-y-1">
            <div className="flex items-center justify-start gap-1">
              <UsersRoundIcon className="size-4 text-gray-400" />
              <span>
                {record?.seatAvailable} / {record?.seatTotal}
              </span>
            </div>
            {record?.seatAvailable === 0 && (
              <Tag
                className="rounded-md bg-red-600 px-2.5 text-white"
                variant="outlined"
              >
                Hết chỗ
              </Tag>
            )}
          </div>
        ),
      },
      {
        title: 'Trạng thái',
        width: 120,
        dataIndex: 'status',
        key: 'status',
        render: (value: TFlightStatus) => (
          <div>
            <Tag
              className="px-2 py-0.5"
              color={FLIGHT_STATUS_COLOR[value]}
              variant="outlined"
            >
              {FLIGHT_STATUS_LABEL[value]}
            </Tag>
          </div>
        ),
      },
      {
        title: <span className="pr-6">Giá</span>,
        dataIndex: 'priceAdult',
        width: 120,
        key: 'priceAdult',
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
        align: showInSelectFlightDrawer ? 'center' : 'left',
        width: 100,
        render: (record: TFlightListItem) =>
          showInSelectFlightDrawer ? (
            <Button
              variant={'outline'}
              onClick={() => customOnSelectRecord?.(record)}
            >
              Chọn
            </Button>
          ) : (
            <FlightDetailActionGroups flight={record} />
          ),
      },
    ],
    [customOnSelectRecord, showInSelectFlightDrawer]
  );

  return (
    <div className="space-y-6">
      <FlightListFilter showFilters={!showInSelectFlightDrawer} />

      {!showInSelectFlightDrawer && (
        <FlightStatistics
          data={statisticsDataResponse?.data}
          isShowSkeleton={isFetchingStatistics}
        />
      )}

      <AppTable<TFlightListItem>
        size="small"
        rowKey={'id'}
        dataSource={flightList}
        totalCount={totalItems}
        columns={columns}
        isShowSkeleton={isFetching}
        onRow={record => {
          if (showInSelectFlightDrawer) return {};

          return {
            onClick: () => handleViewDetail(record),
            className: 'cursor-pointer',
          };
        }}
      />

      <FlightDetailDrawer
        flightId={selectedFlightId}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
};
