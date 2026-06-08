import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from '@/components/ui/carousel';
import { PageHelmet } from '@/components/app-ui/app-helmet';
import { ModuleCard } from '@/features/dashboard/components/module-card';
import { WelcomeCard } from '@/features/dashboard/components/welcome-card';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { formatDisplayCurrency } from '@/lib/helpers/string';
import {
  formatCompactNumber,
  formatDisplayedNumber,
} from '@/lib/helpers/number';
import {
  BanknoteIcon,
  MapIcon,
  PackageIcon,
  PlaneIcon,
  ReceiptIcon,
  ShoppingCartIcon,
  TicketCheckIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    value: 1280500000,
    icon: BanknoteIcon,
    trend: '+12.5%',
    trendUp: true,
    format: 'compact' as const,
  },
  {
    label: 'Sản phẩm đang bán',
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
    label: 'Tỷ lệ hoàn thành thanh toán',
    value: 94.2,
    icon: TicketCheckIcon,
    trend: '+2.1%',
    trendUp: true,
    suffix: '%',
  },
];

const quickTasks = [
  {
    label: 'Tạo chuyến bay',
    path: flightManagementPaths.createFlight.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách chuyến bay',
    path: flightManagementPaths.flightList.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách đơn hàng',
    path: flightManagementPaths.bookingList.fullPath,
    icon: ShoppingCartIcon,
  },
  {
    label: 'Tạo chuyến bay',
    path: flightManagementPaths.createFlight.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách chuyến bay',
    path: flightManagementPaths.flightList.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách đơn hàng',
    path: flightManagementPaths.bookingList.fullPath,
    icon: ShoppingCartIcon,
  },
  {
    label: 'Tạo chuyến bay',
    path: flightManagementPaths.createFlight.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách chuyến bay',
    path: flightManagementPaths.flightList.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách đơn hàng',
    path: flightManagementPaths.bookingList.fullPath,
    icon: ShoppingCartIcon,
  },
  {
    label: 'Tạo chuyến bay',
    path: flightManagementPaths.createFlight.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách chuyến bay',
    path: flightManagementPaths.flightList.fullPath,
    icon: PlaneIcon,
  },
  {
    label: 'Danh sách đơn hàng',
    path: flightManagementPaths.bookingList.fullPath,
    icon: ShoppingCartIcon,
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

      <div className="space-y-6">
        <WelcomeCard />

        <div className="grid grid-cols-4 gap-3">
          {statCards.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="card flex flex-col gap-1.5 p-3">
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-muted p-1.5">
                    <Icon className="size-4 text-primary" />
                  </div>
                  <span
                    className={`text-xs font-medium ${card.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                  >
                    {card.trend}
                  </span>
                </div>
                <p className="text-lg leading-tight font-semibold">
                  {card.format === 'compact'
                    ? formatCompactNumber(card.value)
                    : card.suffix
                      ? `${formatDisplayedNumber(card.value)}${card.suffix}`
                      : formatDisplayedNumber(card.value)}
                </p>
                <p className="text-xs text-muted-foreground">{card.label}</p>
              </div>
            );
          })}
        </div>

        <Carousel
          className="w-full px-px"
          opts={{ align: 'start', loop: true }}
        >
          <CarouselContent>
            {quickTasks.map((task, index) => {
              const Icon = task.icon;
              return (
                <CarouselItem
                  key={index}
                  className="basis-1/4 md:basis-1/4 lg:basis-1/6"
                >
                  <Button
                    variant={'outline'}
                    className="h-auto w-full rounded-lg"
                  >
                    <a
                      key={index}
                      href={task.path}
                      className="inline-flex w-full cursor-pointer flex-col items-center gap-2 px-2 py-4 text-sm font-medium"
                    >
                      <div className="p-2">
                        <Icon className="size-5 text-primary" />
                      </div>

                      <span className="block w-full truncate text-center">
                        {task.label}
                      </span>
                    </a>
                  </Button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

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
        </div>

        <Carousel className="w-full" opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {modules.map(module => (
              <CarouselItem
                key={module.title}
                className="md:basis-1/2 lg:basis-1/3"
              >
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
          <CarouselDots className="mt-4" />
        </Carousel>
      </div>
    </>
  );
};
