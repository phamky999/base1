import { Skeleton } from '@/components/ui/skeleton';
import { GET_FLIGHT_FILTER_KEYS } from '@/features/flight-management/constants';
import { useGetFlightStaticsQuery } from '@/features/flight-management/query';
import type { TGetFlightListRequestParams } from '@/features/flight-management/types';
import { useQueryHandle } from '@/hooks/use-query-handle';
import {
  CircleCheckBigIcon,
  PlaneIcon,
  TicketIcon,
  TicketsPlaneIcon,
} from 'lucide-react';

export const FlightStatistics = () => {
  const { getApiQueryParamsFromUrlQuery } =
    useQueryHandle<TGetFlightListRequestParams>();

  const params = getApiQueryParamsFromUrlQuery({
    keys: GET_FLIGHT_FILTER_KEYS,
    noPagination: true,
  });

  const { data, isFetching } = useGetFlightStaticsQuery({
    ...params,
  } as TGetFlightListRequestParams);

  const statisticsData = data?.data;

  const statistics = [
    {
      label: 'Tổng số chuyến bay',
      value: statisticsData?.totalFlights || 0,
      icon: PlaneIcon,
    },
    {
      label: 'Đang mở bán',
      value: statisticsData?.totalActiveFlights || 0,
      icon: CircleCheckBigIcon,
    },
    {
      label: 'Tổng số vé',
      value: statisticsData?.totalSeats || 0,
      icon: TicketsPlaneIcon,
    },
    {
      label: 'Số vé còn lại',
      value: statisticsData?.totalAvailableSeats || 0,
      icon: TicketIcon,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {statistics.map((item, index) => (
        <div key={index} className="rounded-lg border bg-card p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{item.label}</p>
            <item.icon className="size-4" />
          </div>

          <div className="mt-2">
            {isFetching ? (
              <Skeleton className="h-7 w-full rounded-md" />
            ) : (
              <span className="text-2xl font-bold">{item.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
