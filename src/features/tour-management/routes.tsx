import { lazyNamedExport } from '@/lib/utils';
import { Navigate, type RouteObject } from 'react-router-dom';

const TourCategoryPage = lazyNamedExport(
  () => import('@/features/tour-management/views/tour-category-page'),
  'TourCategoryPage'
);

const TourListPage = lazyNamedExport(
  () => import('@/features/tour-management/views/tour-list-page'),
  'TourListPage'
);

const TourCreatePage = lazyNamedExport(
  () => import('@/features/tour-management/views/tour-create-page'),
  'TourCreatePage'
);

export const tourManagementPaths = {
  root: {
    path: '/tour-management',
  },

  tourCategory: {
    path: 'category',
    fullPath: '/tour-management/category',
  },

  tourList: {
    path: 'tour',
    fullPath: '/tour-management/tour',
  },

  createTour: {
    path: 'create',
    fullPath: '/tour-management/tour/create',
  },
};

export const tourManagementRoutes: RouteObject[] = [
  {
    path: tourManagementPaths.root.path,
    handle: {
      crumb: () => 'Kho tour',
    },

    children: [
      {
        index: true,
        element: <Navigate to={tourManagementPaths.tourList.path} replace />,
      },
      {
        path: tourManagementPaths.tourCategory.path,
        handle: {
          crumb: () => 'Danh sách tuyến tour',
        },

        children: [
          {
            index: true,
            element: <TourCategoryPage />,
          },
        ],
      },

      {
        path: tourManagementPaths.tourList.path,
        handle: {
          crumb: () => 'Danh sách tour',
        },

        children: [
          {
            index: true,
            element: <TourListPage />,
          },
          {
            path: tourManagementPaths.createTour.path,
            element: <TourCreatePage />,
            handle: {
              crumb: () => 'Thêm mới tour',
            },
          },
        ],
      },
    ],
  },
];
