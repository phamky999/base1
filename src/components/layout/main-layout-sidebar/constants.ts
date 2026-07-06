import { flightManagementPaths } from '@/features/flight-management/routes';
import { merchantManagementPaths } from '@/features/merchant-management/routes';
import { systemManagementPaths } from '@/features/system-management/routes';
import { tourManagementPaths } from '@/features/tour-management/routes';
import {
  LayoutDashboardIcon,
  MapIcon,
  MonitorCogIcon,
  SettingsIcon,
  TicketsPlaneIcon,
} from 'lucide-react';

type TBaseNavItem = {
  title: string;
  badge?: string;
  icon?: React.ElementType;
  disabled?: boolean;
  hiddenInSidebar?: boolean;
};

type TNavLink = TBaseNavItem & {
  url: string;
  items?: never;
};

type TNavCollapsible = TBaseNavItem & {
  items: (TBaseNavItem & { url: string })[];
  url?: never;
};

type TNavItem = TNavCollapsible | TNavLink;

type TNavGroup = {
  title: string;
  items: TNavItem[];
};

type TSidebarData = {
  navGroups: TNavGroup[];
};

export type { TNavCollapsible, TNavGroup, TNavItem, TNavLink, TSidebarData };

export const sidebarData: TSidebarData = {
  navGroups: [
    {
      title: 'MENU',
      items: [
        {
          title: 'Trang chủ',
          url: '/',
          icon: LayoutDashboardIcon,
        },
        {
          title: 'Kho vé máy bay',
          icon: TicketsPlaneIcon,
          items: [
            {
              title: 'Danh sách chuyến bay',
              url: flightManagementPaths.flightList.fullPath,
            },
            {
              title: 'Tạo chuyến bay',
              url: flightManagementPaths.createFlight.fullPath,
              hiddenInSidebar: true,
            },
            {
              title: 'Tạo chuyến bay từ Excel',
              url: flightManagementPaths.importExcel.fullPath,
              hiddenInSidebar: true,
            },
            {
              title: 'Danh sách đơn hàng',
              url: flightManagementPaths.bookingList.fullPath,
            },
            {
              title: 'Tạo đơn hàng vé máy bay',
              url: flightManagementPaths.createBooking.fullPath,
              hiddenInSidebar: true,
            },
            {
              title: 'Bộ điều kiện vé',
              url: flightManagementPaths.ticketConditions.fullPath,
            },
          ],
        },
        ...(import.meta.env.DEV
          ? [
              {
                title: 'Kho tour',
                icon: MapIcon,
                items: [
                  {
                    title: 'Danh sách tuyến tour',
                    url: tourManagementPaths.tourCategory.fullPath,
                  },
                  {
                    title: 'Danh sách tour',
                    url: tourManagementPaths.tourList.fullPath,
                  },
                ],
              },
            ]
          : []),

        {
          title: 'Quản lý kênh bán',
          icon: MonitorCogIcon,
          url: merchantManagementPaths.merchantList.fullPath,
        },
        {
          title: 'Cài đặt hệ thống',
          icon: SettingsIcon,
          items: [
            {
              title: 'Cấu hình Email',
              url: systemManagementPaths.emailConfig.fullPath,
            },

            {
              title: 'Tài khoản',
              url: systemManagementPaths.accountList.fullPath,
            },
          ],
        },
      ],
    },
  ],
};
