import { appPathConfig } from '@/app/router/app-router-paths';
import { AppErrorBoundary } from '@/components/app-error-boundary';
import { AuthLayout } from '@/components/layout/auth-layout';
import { MainLayout } from '@/components/layout/main-layout';
import { authRoutes } from '@/features/auth/routes';
import { flightManagementRoutes } from '@/features/flight-management/routes';
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
  {
    path: appPathConfig.auth.root,
    element: <AuthLayout />,
    errorElement: <AppErrorBoundary />,
    children: [...authRoutes],
  },

  {
    path: appPathConfig.portal.root,
    element: <MainLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        index: true,
        element: <PortalPage />,
      },
      // declare app features routes
      ...flightManagementRoutes,
      ...systemManagementRoutes,
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
