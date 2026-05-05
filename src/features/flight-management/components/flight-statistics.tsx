import {
  FLIGHT_STATUS_OPTION,
  mockReportData,
} from '@/features/flight-management/constants';
import { cn } from '@/lib/utils';

export const FlightStatistics = () => {
  const { totalFlight, totalSeat, totalAvailable, countFlightByStatus } =
    mockReportData || {};

  const statistics = [
    {
      label: 'Tổng số chuyến bay',
      value: totalFlight,
    },
    {
      label: 'Chuyến bay đang hoạt động',
      value: countFlightByStatus[FLIGHT_STATUS_OPTION.ACTIVE],
      valueClassName: 'text-blue-500',
    },
    {
      label: 'Tổng số vé',
      value: totalSeat,
    },
    {
      label: 'Số vé còn lại',
      value: totalAvailable,
      valueClassName: 'text-blue-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {statistics.map((item, index) => (
        <div
          key={index}
          className="rounded-lg border bg-background p-4 shadow-xs"
        >
          <p className="text-sm font-medium">{item.label}</p>
          <p className="mt-2">
            <span
              className={cn(
                'text-lg font-bold text-foreground',
                item.valueClassName
              )}
            >
              {item.value}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};
