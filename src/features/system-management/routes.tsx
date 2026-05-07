import { appPathConfig, getPagePath } from '@/app/router/app-router-paths';
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

export const systemManagementRoutes: RouteObject[] = [
  {
    path: appPathConfig.portal.systemManagement.root,
    handle: {
      crumb: () => 'Cài đặt hệ thống',
    },
    children: [
      {
        index: true,
        element: <Navigate to={getPagePath('accountListPage')} replace />,
      },
      {
        path: appPathConfig.portal.systemManagement.accountList,
        handle: {
          crumb: () => 'Danh sách tài khoản',
        },
        element: <AccountListPage />,
      },
      {
        path: appPathConfig.portal.systemManagement.emailConfig,
        element: <EmailConfigurationPage />,
        handle: {
          crumb: () => 'Cấu hình email',
        },
      },
      {
        path: appPathConfig.portal.systemManagement.notificationConfig,
        element: <NotificationConfigurationPage />,
        handle: {
          crumb: () => 'Cấu hình thông báo',
        },
      },
    ],
  },
];
