import { lazyNamedExport } from '@/lib/utils';
import { Navigate, type RouteObject } from 'react-router-dom';

const MerchantListPage = lazyNamedExport(
  () => import('@/features/merchant-management/views/merchant-list-page'),
  'MerchantListPage'
);

export const merchantManagementPaths = {
  root: {
    path: '/merchant-management',
  },
  merchantList: {
    path: 'list',
    fullPath: '/merchant-management/list',
  },
};

export const merchantManagementRoutes: RouteObject[] = [
  {
    path: merchantManagementPaths.root.path,
    handle: {
      crumb: () => 'Quản lý kênh bán',
    },
    children: [
      {
        index: true,
        element: (
          <Navigate to={merchantManagementPaths.merchantList.path} replace />
        ),
      },
      {
        path: merchantManagementPaths.merchantList.path,
        element: <MerchantListPage />,
        handle: {
          crumb: () => 'Danh sách kênh bán',
        },
      },
    ],
  },
];
