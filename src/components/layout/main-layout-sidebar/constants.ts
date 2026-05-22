import { flightManagementPaths } from '@/features/flight-management/routes';
import { merchantManagementPaths } from '@/features/merchant-management/routes';
import { systemManagementPaths } from '@/features/system-management/routes';
import {
  LayoutDashboard,
  MonitorCogIcon,
  Settings,
  TicketsPlane,
} from 'lucide-react';

type TBaseNavItem = {
  title: string;
  badge?: string;
  icon?: React.ElementType;
  disabled?: boolean;
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
          icon: LayoutDashboard,
        },
        {
          title: 'Kho vé máy bay',
          icon: TicketsPlane,
          items: [
            {
              title: 'Danh sách chuyến bay',
              url: flightManagementPaths.flightList.fullPath,
            },
            {
              title: 'Đơn hàng',
              url: flightManagementPaths.bookingList.fullPath,
            },
            {
              title: 'Bộ điều kiện vé',
              url: flightManagementPaths.ticketConditions.fullPath,
            },
          ],
        },
        {
          title: 'Quản lý kênh bán',
          icon: MonitorCogIcon,
          url: merchantManagementPaths.merchantList.fullPath,
        },
        {
          title: 'Cài đặt hệ thống',
          icon: Settings,
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
