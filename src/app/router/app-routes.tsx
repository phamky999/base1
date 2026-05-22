import { AppErrorBoundary } from '@/components/app-error-boundary';
import { MainLayout } from '@/components/layout/main-layout';
import { authRoutes } from '@/features/auth/routes';
import { flightManagementRoutes } from '@/features/flight-management/routes';
import { merchantManagementRoutes } from '@/features/merchant-management/routes';
import { systemManagementRoutes } from '@/features/system-management/routes';
import { lazyNamedExport } from '@/lib/utils';
import { createBrowserRouter } from 'react-router-dom';

const PortalPage = lazyNamedExport(
  () => import('@/pages/PortalPage'),
  'PortalPage'
);

const NotFoundPage = lazyNamedExport(
  () => import('@/pages/NotFoundPage'),
  'NotFoundPage'
);

export const appRoutes = createBrowserRouter([
  // Unauthenticated routes
  ...authRoutes,

  // Authenticated routes
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        index: true,
        element: <PortalPage />,
      },
      // declare app features routes
      ...flightManagementRoutes,
      ...merchantManagementRoutes,
      ...systemManagementRoutes,
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
