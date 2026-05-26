import { lazyNamedExport } from '@/lib/utils';
import { generatePath, Navigate, type RouteObject } from 'react-router-dom';

const FlightListPage = lazyNamedExport(
  () => import('@/features/flight-management/views/flight-list-page'),
  'FlightListPage'
);

const CreateFlightPage = lazyNamedExport(
  () => import('@/features/flight-management/views/create-flight-page'),
  'CreateFlightPage'
);

const FlightImportExcelPage = lazyNamedExport(
  () => import('@/features/flight-management/views/flight-import-excel-page'),
  'FlightImportExcelPage'
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

export const flightManagementPaths = {
  root: {
    path: '/flight-management',
  },

  flightList: {
    path: 'list',
    fullPath: '/flight-management/list',
  },

  createFlight: {
    path: 'create',
    fullPath: '/flight-management/list/create',
  },

  importExcel: {
    path: 'import-excel',
    fullPath: '/flight-management/list/import-excel',
  },

  flightDetail: {
    path: ':id',
    buildFullPath: (id: string) =>
      generatePath('/flight-management/list/:id', { id }),
  },

  bookingList: {
    path: 'booking-list',
    fullPath: '/flight-management/booking-list',
  },

  ticketConditions: {
    path: 'ticket-conditions',
    fullPath: '/flight-management/ticket-conditions',
  },
};

export const flightManagementRoutes: RouteObject[] = [
  {
    path: flightManagementPaths.root.path,
    handle: {
      crumb: () => 'Kho vé máy bay',
    },
    children: [
      {
        index: true,
        element: (
          <Navigate to={flightManagementPaths.flightList.path} replace />
        ),
      },
      {
        path: flightManagementPaths.flightList.path,
        handle: {
          crumb: () => 'Danh sách chuyến bay',
        },
        children: [
          {
            index: true,
            element: <FlightListPage />,
          },
          {
            path: flightManagementPaths.createFlight.path,
            element: <CreateFlightPage />,
            handle: {
              crumb: () => 'Tạo chuyến bay',
            },
          },
          {
            path: flightManagementPaths.importExcel.path,
            element: <FlightImportExcelPage />,
            handle: {
              crumb: () => 'Import Excel',
            },
          },

          {
            path: flightManagementPaths.flightDetail.path,
            element: <FlightDetailPage />,
            handle: {
              crumb: () => 'Thông tin chuyến bay',
            },
          },
        ],
      },
      {
        path: flightManagementPaths.bookingList.path,
        element: <FlightBookingListPage />,
        handle: {
          crumb: () => 'Danh sách đơn hàng',
        },
      },
      {
        path: flightManagementPaths.ticketConditions.path,
        element: <TicketConditionsPage />,
        handle: {
          crumb: () => 'Bộ điều kiện vé',
        },
      },
    ],
  },
];
