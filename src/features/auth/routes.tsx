import { appPathConfig } from '@/app/router/app-router-paths';
import { lazyNamedExport } from '@/lib/utils';
import type { RouteObject } from 'react-router-dom';

const LoginPage = lazyNamedExport(
  () => import('@/features/auth/views/LoginPage'),
  'LoginPage'
);

export const authRoutes: RouteObject[] = [
  {
    index: false,
    path: appPathConfig.auth.login,
    element: <LoginPage />,
  },
];
