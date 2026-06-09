import { PageHelmet } from '@/components/app-ui/app-helmet';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ModuleCard } from '@/features/dashboard/components/module-card';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { systemManagementPaths } from '@/features/system-management/routes';
import {
  formatCompactNumber,
  formatDisplayedNumber,
} from '@/lib/helpers/number';
import {
  BanknoteIcon,
  ClipboardListIcon,
  ClipboardPlus,
  ClipboardPlusIcon,
  CloudUploadIcon,
  MapIcon,
  PackageIcon,
  PlaneIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  TicketCheckIcon,
  TicketPlusIcon,
  TicketsPlaneIcon,
  UsersIcon,
} from 'lucide-react';

const modules = [
  {
    title: 'Kho vé máy bay',
    description: 'Quản lý chuyến bay, lịch trình  và tình trạng đặt chỗ',
    icon: PlaneIcon,
    iconBg: 'bg-blue-50 dark:bg-blue-950',
    iconColor: 'text-blue-600 dark:text-blue-400',
    viewListPath: flightManagementPaths.flightList.fullPath,
    createPath: flightManagementPaths.createFlight.fullPath,
    viewBookingPath: flightManagementPaths.bookingList.fullPath,
    isReleased: true,
    createBtnLabel: 'Tạo chuyến bay',
  },
  {
    title: 'Kho tour',
    description: 'Quản lý tour du lịch, lịch trình  và tình trạng đặt tour',
    icon: MapIcon,
    iconBg: 'bg-green-50 dark:bg-green-950',
    iconColor: 'text-green-600 dark:text-green-400',
    viewListPath: '#',
    createPath: '#',
    viewBookingPath: '#',
    isReleased: false,
    createBtnLabel: 'Tạo tour',
  },
];

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
    label: 'Đang mở bán',
    value: 1248,
    icon: PackageIcon,
    trend: '+8',
    trendUp: true,
  },
  {
    label: 'Đơn hàng',
    value: 36,
    icon: ReceiptIcon,
    trend: '-5',
    trendUp: false,
  },
  {
    label: 'Tỷ lệ hoàn thành',
    value: 94.2,
    icon: TicketCheckIcon,
    trend: '+2.1%',
    trendUp: true,
    suffix: '%',
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
    label: 'Danh sách chuyến bay',
    path: flightManagementPaths.flightList.fullPath,
    icon: TicketsPlaneIcon,
  },
  {
    label: 'Tạo đơn hàng vé máy bay',
    path: flightManagementPaths.createBooking.fullPath,
    icon: ClipboardPlusIcon,
  },
  {
    label: 'Danh sách đơn hàng vé máy bay',
    path: flightManagementPaths.bookingList.fullPath,
    icon: ClipboardListIcon,
  },
  {
    label: 'Danh sách tài khoản',
    path: systemManagementPaths.accountList.fullPath,
    icon: UsersIcon,
  },
];

const recentOrders = [
  {
    code: 'DH-20240601',
    customer: 'Nguyễn Văn A',
    date: '01/06/2024',
    status: 'completed',
    total: 12500000,
  },
  {
    code: 'DH-20240602',
    customer: 'Trần Thị B',
    date: '31/05/2024',
    status: 'pending',
    total: 5800000,
  },
  {
    code: 'DH-20240603',
    customer: 'Lê Văn C',
    date: '30/05/2024',
    status: 'completed',
    total: 9200000,
  },
  {
    code: 'DH-20240604',
    customer: 'Phạm Thị D',
    date: '29/05/2024',
    status: 'cancelled',
    total: 3400000,
  },
  {
    code: 'DH-20240605',
    customer: 'Hoàng Văn E',
    date: '28/05/2024',
    status: 'completed',
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

const statusMap: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  completed: { label: 'Hoàn thành', variant: 'default' },
  pending: { label: 'Chờ thanh toán', variant: 'secondary' },
  cancelled: { label: 'Đã hủy', variant: 'destructive' },
};

export const DashboardPage = () => {
  return (
    <>
      <PageHelmet title="Trang chủ" />

      <div className="space-y-4">
        <WelcomeCard />

        {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card flex flex-col gap-2 p-3">
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
                  <p className="text-xs text-muted-foreground">{card.label}</p>
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
                <a
                  key={index}
                  href={task.path}
                  className="flex w-full cursor-pointer flex-col items-center gap-2 px-2 py-4 text-sm font-medium"
                >
                  <div className="p-2">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <span className="block w-full text-center break-normal">
                    {task.label}
                  </span>
                </a>
              </div>
            );
          })}
        </div> */}

        {/* 
        <div className="grid grid-cols-1 gap-6">
          <div className="card">
            <h3 className="mb-3 text-sm font-semibold">Đơn hàng gần nhất</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={order.code}>
                    <TableCell className="font-medium">{order.code}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={statusMap[order.status].variant}>
                        {statusMap[order.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatDisplayCurrency(order.total)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="card">
            <h3 className="mb-3 text-sm font-semibold">
              Chuyến bay sắp khởi hành còn chỗ
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã bay</TableHead>
                  <TableHead>Chặng</TableHead>
                  <TableHead>Ngày bay</TableHead>
                  <TableHead>Còn trống</TableHead>
                  <TableHead>Tổng số</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expiringFlights.map(flight => (
                  <TableRow key={flight.code}>
                    <TableCell className="font-medium">{flight.code}</TableCell>
                    <TableCell>{flight.route}</TableCell>
                    <TableCell>{flight.departure}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          flight.available < 10 ? 'destructive' : 'secondary'
                        }
                      >
                        {flight.available}
                      </Badge>
                    </TableCell>
                    <TableCell>{flight.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div> */}

        <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {modules.map(module => (
              <CarouselItem key={module.title} className="md:basis-1/2">
                <ModuleCard
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  iconBg={module.iconBg}
                  iconColor={module.iconColor}
                  viewListPath={module.viewListPath}
                  createPath={module.createPath}
                  viewBookingPath={module.viewBookingPath}
                  isReleased={module.isReleased}
                  createBtnLabel={module.createBtnLabel}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
