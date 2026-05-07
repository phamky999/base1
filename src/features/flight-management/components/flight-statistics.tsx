import {
  FLIGHT_STATUS_OPTION,
  mockReportData,
} from '@/features/flight-management/constants';

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
    },
    {
      label: 'Tổng số vé',
      value: totalSeat,
    },
    {
      label: 'Số vé còn lại',
      value: totalAvailable,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {statistics.map((item, index) => (
        <div key={index} className="rounded-lg border bg-card p-4 shadow-sm">
          <p className="text-sm font-medium text-gray-400">{item.label}</p>
          <p className="mt-2">
            <span className="text-lg font-bold">{item.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
