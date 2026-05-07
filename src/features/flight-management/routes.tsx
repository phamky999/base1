import { appPathConfig, getPagePath } from '@/app/router/app-router-paths';
import { lazyNamedExport } from '@/lib/utils';
import { Navigate, type RouteObject } from 'react-router-dom';

const FlightListPage = lazyNamedExport(
  () => import('@/features/flight-management/views/flight-list-page'),
  'FlightListPage'
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

const TicketConditionsPage = lazyNamedExport(
  () => import('@/features/flight-management/views/ticket-conditions-page'),
  'TicketConditionsPage'
);

export const flightManagementRoutes: RouteObject[] = [
  {
    path: appPathConfig.portal.flightManagement.root,
    handle: {
      crumb: () => 'Kho vé máy bay',
    },
    children: [
      {
        index: true,
        element: <Navigate to={getPagePath('flightListPage')} replace />,
      },
      {
        path: appPathConfig.portal.flightManagement.flightList.root,
        handle: {
          crumb: () => 'Danh sách chuyến bay',
        },
        children: [
          {
            index: true,
            element: <FlightListPage />,
          },
          {
            path: appPathConfig.portal.flightManagement.flightList.createFlight,
            element: <CreateFlightPage />,
            handle: {
              crumb: () => 'Tạo chuyến bay',
            },
          },
          {
            path: appPathConfig.portal.flightManagement.flightList.flightDetail,
            element: <FlightDetailPage />,
            handle: {
              crumb: () => 'Thông tin chuyến bay',
            },
          },
        ],
      },
      {
        path: appPathConfig.portal.flightManagement.bookingList,
        element: <FlightBookingListPage />,
        handle: {
          crumb: () => 'Danh sách booking',
        },
      },
      {
        path: appPathConfig.portal.flightManagement.ticketConditions,
        element: <TicketConditionsPage />,
        handle: {
          crumb: () => 'Bộ điều kiện vé',
        },
      },
    ],
  },
];
