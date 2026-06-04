import { AppScreenLoader } from '@/components/app-screen-loader';
import { MainLayoutHeader } from '@/components/layout/main-layout-header';
import { MainLayoutSidebar } from '@/components/layout/main-layout-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { authPaths } from '@/features/auth/routes';
import { TOKEN } from '@/lib/constants';
import { cn, getAuthToken } from '@/lib/utils';
import { Suspense } from 'react';
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';

export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();

  const hasAccessToken = !!getAuthToken(TOKEN.ACCESS_TOKEN);
  const hasRefreshToken = !!getAuthToken(TOKEN.REFRESH_TOKEN);

  if (!hasAccessToken && !hasRefreshToken) {
    return (
      <Navigate
        to={authPaths.login.fullPath}
        replace
        state={{ redirectTo: location.pathname + location.search }}
      />
    );
  }

  return <MainLayoutInner>{children}</MainLayoutInner>;
};

const MainLayoutInner = ({ children }: { children?: React.ReactNode }) => {
  const { isLoading } = useAuth();

  if (isLoading) return <AppScreenLoader />;

  return (
    <>
      <SidebarProvider>
        <MainLayoutSidebar />
        <SidebarInset
          className={cn(
            // Set content container, so we can use container queries
            '@container/content',

            // If layout is fixed, set the height
            // to 100svh to prevent overflow
            'has-data-[layout=fixed]:h-svh',

            // If layout is fixed and sidebar is inset,
            // set the height to 100svh - spacing (total margins) to prevent overflow
            'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]',
            'min-w-0'
          )}
        >
          <MainLayoutHeader />
          <div className="min-h-svh flex-1 bg-(--main-background) p-4 py-4! md:p-2 md:pt-6!">
            <Suspense fallback={<AppScreenLoader isFullScreen={false} />}>
              <div className="mx-auto max-w-412">{children ?? <Outlet />}</div>
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <ScrollRestoration />
    </>
  );
};
