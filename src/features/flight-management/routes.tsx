import { appPathConfig } from '@/app/router/app-router-paths';
import { lazyNamedExport } from '@/lib/utils';
import type { RouteObject } from 'react-router-dom';

const FlightInventoryManagementPage = lazyNamedExport(
  () =>
    import('@/features/flight-management/views/flight-inventory-management-page'),
  'FlightInventoryManagementPage'
);

const CreateFlightPage = lazyNamedExport(
  () => import('@/features/flight-management/views/create-flight-page'),
  'CreateFlightPage'
);

const FlightDetailPage = lazyNamedExport(
  () => import('@/features/flight-management/views/flight-detail-page'),
  'FlightDetailPage'
);

const FlightBookingListPage = lazyNamedExport(
  () => import('@/features/flight-management/views/flight-booking-list-page'),
  'FlightBookingListPage'
);

export const flightManagementRoutes: RouteObject[] = [
  {
    path: appPathConfig.portal.flightInventoryManagement.root,
    handle: {
      crumb: () => 'Kho vé máy bay',
    },
    children: [
      {
        index: true,
        element: <FlightInventoryManagementPage />,
      },
      {
        path: appPathConfig.portal.flightInventoryManagement.createFlight,
        element: <CreateFlightPage />,
        handle: {
          crumb: () => 'Tạo chuyến bay',
        },
      },
      {
        path: appPathConfig.portal.flightInventoryManagement.flightDetail,
        element: <FlightDetailPage />,
        handle: {
          crumb: () => 'Thông tin chuyến bay',
        },
      },
      {
        path: appPathConfig.portal.flightInventoryManagement.bookingList,
        element: <FlightBookingListPage />,
        handle: {
          crumb: () => 'Danh sách booking',
        },
      },
    ],
  },
];
