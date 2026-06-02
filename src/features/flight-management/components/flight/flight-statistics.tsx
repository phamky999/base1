import { Skeleton } from '@/components/ui/skeleton';
import type { TGetFlightStaticsResponse } from '@/features/flight-management/types';
import {
  CircleCheckBigIcon,
  PlaneIcon,
  TicketIcon,
  TicketsPlaneIcon,
} from 'lucide-react';

const STATISTIC_CONFIGS = [
  { key: 'totalFlights', label: 'Tổng số chuyến bay', icon: PlaneIcon },
  { key: 'totalActiveFlights', label: 'Đang mở bán', icon: CircleCheckBigIcon },
  { key: 'totalSeats', label: 'Tổng số ghế', icon: TicketsPlaneIcon },
  { key: 'totalAvailableSeats', label: 'Số ghế còn lại', icon: TicketIcon },
] as const;

type FlightStatisticsProps = {
  data?: TGetFlightStaticsResponse;
  isShowSkeleton?: boolean;
};

export const FlightStatistics = ({
  data,
  isShowSkeleton,
}: FlightStatisticsProps) => {
  const statistics = STATISTIC_CONFIGS.map(item => ({
    label: item.label,
    icon: item.icon,
    value: data?.[item.key] ?? 0,
  }));

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {statistics.map((item, index) => (
        <div key={index} className="card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-400">{item.label}</p>
            <item.icon className="size-4" />
          </div>

          <div className="mt-2">
            {isShowSkeleton ? (
              <Skeleton className="h-7.5 w-full rounded-md" />
            ) : (
              <span className="text-2xl leading-7.5 font-bold">
                {item.value}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
