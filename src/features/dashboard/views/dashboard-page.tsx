import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppTable } from '@/components/app-ui/app-table';
import { Button } from '@/components/ui/button';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import {
  FLIGHT_BOOKING_STATUS,
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { merchantManagementPaths } from '@/features/merchant-management/routes';
import { systemManagementPaths } from '@/features/system-management/routes';
import {
  formatCompactNumber,
  formatDisplayedNumber,
} from '@/lib/helpers/number';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import { cn } from '@/lib/utils';
import { Tag } from 'antd';
import {
  BanknoteIcon,
  ClipboardPlusIcon,
  CloudUploadIcon,
  MonitorCogIcon,
  PackageIcon,
  ReceiptIcon,
  SquareKanbanIcon,
  SquareUserIcon,
  TicketCheckIcon,
  TicketPlusIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const statCards = [
  {
    label: 'Doanh thu tháng',
    value: 128000800,
    icon: BanknoteIcon,
    trend: '+12.5%',
    trendUp: true,
    format: 'compact' as const,
  },
  {
    label: 'Đơn hàng',
    value: 36,
    icon: ReceiptIcon,
    trend: '-5',
    trendUp: false,
  },
  {
    label: 'Tỷ lệ hoàn thành thanh toán',
    value: 94.2,
    icon: TicketCheckIcon,
    trend: '+2.1%',
    trendUp: true,
    suffix: '%',
  },
  {
    label: 'Đang mở bán hiện tại',
    value: 1248,
    icon: PackageIcon,
  },
];

const quickTasks = [
  {
    label: 'Nhập excel chuyến bay',
    path: flightManagementPaths.importExcel.fullPath,
    icon: CloudUploadIcon,
  },
  {
    label: 'Tạo chuyến bay',
    path: flightManagementPaths.createFlight.fullPath,
    icon: TicketPlusIcon,
  },
  {
    label: 'Tạo đơn hàng vé máy bay',
    path: flightManagementPaths.createBooking.fullPath,
    icon: ClipboardPlusIcon,
  },
  {
    label: 'Tạo bộ điều kiện vé',
    path: `${flightManagementPaths.ticketConditions.fullPath}?action=create`,
    icon: SquareKanbanIcon,
    iconClassname: '-rotate-90',
  },
  {
    label: 'Tạo kênh bán',
    path: `${merchantManagementPaths.merchantList.fullPath}?action=create`,
    icon: MonitorCogIcon,
  },
  {
    label: 'Tạo tài khoản',
    path: `${systemManagementPaths.accountList.fullPath}?action=create`,
    icon: SquareUserIcon,
  },
];

const recentOrders = [
  {
    code: 'DH-20240601',
    customer: 'Nguyễn Văn A',
    date: '01/06/2024',
    status: FLIGHT_BOOKING_STATUS.HOLD,
    total: 12500000,
  },
  {
    code: 'DH-20240602',
    customer: 'Trần Thị B',
    date: '31/05/2024',
    status: FLIGHT_BOOKING_STATUS.ISSUED,
    total: 5800000,
  },
  {
    code: 'DH-20240603',
    customer: 'Lê Văn C',
    date: '30/05/2024',
    status: FLIGHT_BOOKING_STATUS.CANCELLED,
    total: 9200000,
  },
  {
    code: 'DH-20240604',
    customer: 'Phạm Thị D',
    date: '29/05/2024',
    status: FLIGHT_BOOKING_STATUS.ISSUED,
    total: 3400000,
  },
  {
    code: 'DH-20240605',
    customer: 'Hoàng Văn E',
    date: '28/05/2024',
    status: FLIGHT_BOOKING_STATUS.ISSUED,
    total: 16700000,
  },
];

const expiringFlights = [
  {
    code: 'VN-A123',
    route: 'HAN - SGN',
    departure: '02/06/2024',
    available: 12,
    total: 180,
  },
  {
    code: 'VJ-B456',
    route: 'SGN - DAD',
    departure: '03/06/2024',
    available: 5,
    total: 200,
  },
  {
    code: 'QH-C789',
    route: 'HAN - DAD',
    departure: '04/06/2024',
    available: 23,
    total: 150,
  },
  {
    code: 'VN-D012',
    route: 'SGN - HAN',
    departure: '05/06/2024',
    available: 8,
    total: 180,
  },
];

export const DashboardPage = () => {
  return (
    <>
      <PageHelmet title="Trang chủ" />

      <div className="space-y-4">
        <WelcomeCard />

        {import.meta.env.DEV && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {statCards.map(card => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="card flex flex-col gap-2 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="rounded-sm bg-muted p-2">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <span
                        className={`font-semibold ${card.trendUp ? 'text-green-500' : 'text-red-500'}`}
                      >
                        {card.trend}
                      </span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {card.format === 'compact'
                          ? formatCompactNumber(card.value)
                          : card.suffix
                            ? `${formatDisplayedNumber(card.value)}${card.suffix}`
                            : formatDisplayedNumber(card.value)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {card.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {quickTasks.map((task, index) => {
                const Icon = task.icon;
                return (
                  <div className="card h-auto w-full cursor-pointer p-0 hover:bg-muted">
                    <Link
                      key={index}
                      to={task.path}
                      className="flex w-full cursor-pointer flex-col items-center gap-2 px-2 py-4 text-sm font-medium"
                    >
                      <div className="p-2">
                        <Icon
                          className={cn(
                            'size-5 text-primary',
                            task?.iconClassname
                          )}
                        />
                      </div>

                      <span className="block w-full text-center break-normal">
                        {task.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="card">
                <div className="mb-4 flex flex-wrap justify-between gap-4">
                  <h3 className="text-base font-semibold">Đơn hàng gần đây</h3>

                  <Link to={flightManagementPaths.bookingList.fullPath}>
                    <Button variant={'link'}>Xem tất cả</Button>
                  </Link>
                </div>
                <AppTable
                  dataSource={recentOrders}
                  rowKey="code"
                  pagination={false}
                  columns={[
                    { title: 'Đơn hàng', dataIndex: 'code' },
                    { title: 'Khách hàng', dataIndex: 'customer' },
                    { title: 'Ngày tạo', dataIndex: 'date' },
                    {
                      title: 'Trạng thái',
                      render: (_, record) => (
                        <Tag
                          variant="outlined"
                          className="px-2.5 py-0.5"
                          color={FLIGHT_BOOKING_STATUS_COLOR[record.status]}
                        >
                          {FLIGHT_BOOKING_STATUS_LABEL[record.status]}
                        </Tag>
                      ),
                    },
                    {
                      title: 'Tổng tiền',
                      align: 'right',
                      render: (_, record) => (
                        <span className="font-semibold tabular-nums">
                          {formatDisplayCurrency(record.total)}
                        </span>
                      ),
                    },
                  ]}
                  className="rounded-none! border-none! shadow-none!"
                />
              </div>

              <div className="card">
                <div className="mb-4 flex flex-wrap justify-between gap-4">
                  <h3 className="text-base font-semibold">
                    Chuyến bay sắp khởi hành còn chỗ
                  </h3>

                  <Link to={flightManagementPaths.flightList.fullPath}>
                    <Button variant={'link'}>Xem tất cả</Button>
                  </Link>
                </div>
                <AppTable
                  dataSource={expiringFlights}
                  rowKey="code"
                  pagination={false}
                  columns={[
                    { title: 'Mã chuyến bay', dataIndex: 'code' },
                    { title: 'Hành trình', dataIndex: 'route' },
                    { title: 'Ngày bay', dataIndex: 'departure' },
                    { title: 'Số ghế còn trống', dataIndex: 'available' },
                  ]}
                  className="rounded-none! border-none! shadow-none!"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
