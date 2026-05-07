export const BookingFlightInfo = () => {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      {/* <h2>Thông tin chuyến bay</h2>
      <p>Mã chuyến bay: VN123</p>
      <p>Hãng hàng không: Vietnam Airlines</p>
      <p>Chặng bay: HAN - SGN</p>
      <p>Ngày bay: 2022-01-01</p>
      <p>Giờ bay: 12:00</p>
      <p>Giờ đến: 13:00</p>
      <p>Loại máy bay: Boeing 737</p>
      <p>Số ghế: 180</p>
      <p>Giá vé: 1000000</p> */}
      <div className="mb-6">
        <p className="text-sm text-gray-400">Thông tin chuyến bay</p>
        <p className="mt-1 font-medium">VN123 · Vietnam Airlines · HAN → SGN</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <div>
          <p className="text-sm text-gray-400">Thời gian bay</p>
          <p className="mt-1 font-medium">12:00 2022-01-01</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Thời gian hạ cánh</p>
          <p className="mt-1 font-medium">13:00 2022-01-01</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Loại máy bay</p>
          <p className="mt-1 font-medium">Boeing 737</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Tổng ghế</p>
          <p className="mt-1 font-medium">180</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Đã đặt</p>
          <p className="mt-1 font-medium">135</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Còn lại</p>
          <p className="mt-1 font-medium">45</p>
        </div>
      </div>
    </div>
  );
};
