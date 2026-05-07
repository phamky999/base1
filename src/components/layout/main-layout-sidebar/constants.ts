import { getPagePath } from '@/app/router/app-router-paths';
import {
  LayoutDashboard,
  MonitorCogIcon,
  Settings,
  TicketsPlane,
} from 'lucide-react';

type TUser = {
  name: string;
  email: string;
  avatar: string;
};

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
  user: TUser;
  navGroups: TNavGroup[];
};

export type { TNavCollapsible, TNavGroup, TNavItem, TNavLink, TSidebarData };

export const sidebarData: TSidebarData = {
  user: {
    name: 'dev',
    email: 'dev@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navGroups: [
    {
      title: 'MENU',
      items: [
        {
          title: 'Trang chủ',
          url: getPagePath('portalPage'),
          icon: LayoutDashboard,
        },
        {
          title: 'Kho vé máy bay',
          icon: TicketsPlane,
          items: [
            {
              title: 'Danh sách chuyến bay',
              url: getPagePath('flightListPage'),
            },
            {
              title: 'Đơn hàng',
              url: getPagePath('flightBookingListPage'),
            },
            {
              title: 'Bộ điều kiện vé',
              url: getPagePath('flightTicketConditionsPage'),
            },
          ],
        },
        {
          title: 'Quản lý kênh bán',
          icon: MonitorCogIcon,
          url: '#',
        },
        {
          title: 'Cài đặt hệ thống',
          icon: Settings,
          items: [
            {
              title: 'Email',
              url: getPagePath('emailConfigPage'),
            },
            {
              title: 'Thông báo',
              url: getPagePath('notificationConfigPage'),
            },

            {
              title: 'Tài khoản',
              url: getPagePath('accountListPage'),
            },
          ],
        },
      ],
    },
  ],
};
