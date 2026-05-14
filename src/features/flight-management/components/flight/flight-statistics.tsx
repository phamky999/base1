export const FlightStatistics = () => {
  const statistics = [
    {
      label: 'Tổng số chuyến bay',
      value: 0,
    },
    {
      label: 'Chuyến bay đang hoạt động',
      value: 0,
    },
    {
      label: 'Tổng số vé',
      value: 0,
    },
    {
      label: 'Số vé còn lại',
      value: 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {statistics.map((item, index) => (
        <div key={index} className="rounded-lg border bg-card p-4 shadow-xs">
          <p className="text-sm font-medium text-gray-400">{item.label}</p>
          <p className="mt-2">
            <span className="text-lg font-bold">{item.value}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
