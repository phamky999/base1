import { formatDisplayCurrency } from '@/lib/helpers/string';

export const FlightBookingStatistics = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
      <div className="rounded-lg border bg-card p-4 shadow-xs">
        <p className="text-sm text-gray-400">Tổng số đơn hàng</p>
        <p className="mt-1 text-xl font-semibold">3</p>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-xs">
        <p className="text-sm text-gray-400">Đã thanh toán</p>
        <p className="mt-1 text-xl font-semibold">2</p>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-xs">
        <p className="text-sm text-gray-400">Đang giữ chỗ</p>
        <p className="mt-1 text-xl font-semibold">1</p>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-xs">
        <p className="text-sm text-gray-400">Đã hủy</p>
        <p className="mt-1 text-xl font-semibold">1</p>
      </div>
      <div className="col-span-2 rounded-lg border bg-card p-4 shadow-xs md:col-span-4 xl:col-span-1">
        <p className="text-sm text-gray-400">Doanh thu</p>
        <p className="mt-1 text-xl font-semibold">
          {formatDisplayCurrency(10000000)}
        </p>
      </div>
    </div>
  );
};
