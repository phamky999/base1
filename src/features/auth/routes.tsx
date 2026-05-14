import { AppErrorBoundary } from '@/components/app-error-boundary';
import { AuthLayout } from '@/components/layout/auth-layout';
import { lazyNamedExport } from '@/lib/utils';
import type { RouteObject } from 'react-router-dom';

const LoginPage = lazyNamedExport(
  () => import('@/features/auth/views/login-page'),
  'LoginPage'
);

export const authPaths = {
  root: {
    path: '/auth',
  },
  login: {
    path: 'login',
    fullPath: '/auth/login',
  },
};

export const authRoutes: RouteObject[] = [
  {
    path: authPaths.root.path,
    element: <AuthLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        index: false,
        path: authPaths.login.path,
        element: <LoginPage />,
      },
    ],
  },
];
