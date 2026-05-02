import { appPathConfig } from '@/app/router/app-router-paths';
import { lazyNamedExport } from '@/lib/utils';
import type { RouteObject } from 'react-router-dom';

const FlightInventoryManagementPage = lazyNamedExport(
  () =>
    import('@/features/flight-inventory-management/views/FlightInventoryManagementPage'),
  'FlightInventoryManagementPage'
);

const CreateFlightPage = lazyNamedExport(
  () => import('@/features/flight-inventory-management/views/CreateFlightPage'),
  'CreateFlightPage'
);

const FlightDetailPage = lazyNamedExport(
  () => import('@/features/flight-inventory-management/views/FlightDetailPage'),
  'FlightDetailPage'
);

const FlightBookingListPage = lazyNamedExport(
  () =>
    import('@/features/flight-inventory-management/views/FlightBookingListPage'),
  'FlightBookingListPage'
);

export const flightInventoryManagementRoutes: RouteObject[] = [
  {
    path: appPathConfig.portal.flight.root,
    handle: {
      crumb: () => 'Danh sách chuyến bay',
    },
    children: [
      {
        index: true,
        element: <FlightInventoryManagementPage />,
      },
      {
        path: appPathConfig.portal.flight.create,
        element: <CreateFlightPage />,
        handle: {
          crumb: () => 'Tạo chuyến bay',
        },
      },
      {
        path: appPathConfig.portal.flight.detail.root,
        handle: {
          crumb: () => 'Thông tin chuyến bay',
        },
        children: [
          {
            index: true,
            element: <FlightDetailPage />,
          },
          {
            path: appPathConfig.portal.flight.detail.bookingList,
            element: <FlightBookingListPage />,
            handle: {
              crumb: () => 'Danh sách booking',
            },
          },
        ],
      },
    ],
  },
];
