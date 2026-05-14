import { lazyNamedExport } from '@/lib/utils';
import { Navigate, type RouteObject } from 'react-router-dom';

const AccountListPage = lazyNamedExport(
  () => import('@/features/system-management/views/account-list-page'),
  'AccountListPage'
);

const EmailConfigurationPage = lazyNamedExport(
  () => import('@/features/system-management/views/email-configuration-page'),
  'EmailConfigurationPage'
);

const NotificationConfigurationPage = lazyNamedExport(
  () =>
    import('@/features/system-management/views/notification-configuration-page'),
  'NotificationConfigurationPage'
);

export const systemManagementPaths = {
  root: {
    path: '/system-management',
  },

  accountList: {
    path: 'account-list',
    fullPath: '/system-management/account-list',
  },

  emailConfig: {
    path: 'email-config',
    fullPath: '/system-management/email-config',
  },

  notificationConfig: {
    path: 'notification-config',
    fullPath: '/system-management/notification-config',
  },
};

export const systemManagementRoutes: RouteObject[] = [
  {
    path: systemManagementPaths.root.path,
    handle: {
      crumb: () => 'Cài đặt hệ thống',
    },
    children: [
      {
        index: true,
        element: (
          <Navigate to={systemManagementPaths.accountList.path} replace />
        ),
      },
      {
        path: systemManagementPaths.accountList.path,
        handle: {
          crumb: () => 'Danh sách tài khoản',
        },
        element: <AccountListPage />,
      },
      {
        path: systemManagementPaths.emailConfig.path,
        element: <EmailConfigurationPage />,
        handle: {
          crumb: () => 'Cấu hình email',
        },
      },
      {
        path: systemManagementPaths.notificationConfig.path,
        element: <NotificationConfigurationPage />,
        handle: {
          crumb: () => 'Cấu hình thông báo',
        },
      },
    ],
  },
];
