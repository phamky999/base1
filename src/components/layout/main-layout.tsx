import { AppScreenLoader } from '@/components/app-screen-loader';
import { MainLayoutHeader } from '@/components/layout/main-layout-header';
import { MainLayoutSidebar } from '@/components/layout/main-layout-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <SidebarProvider>
        <MainLayoutSidebar />
        <SidebarInset className="min-w-0">
          <MainLayoutHeader />
          <div className="min-h-svh flex-1 bg-(--main-background) p-4">
            <div className="mx-auto max-w-[1920px]">
              <Suspense fallback={<AppScreenLoader isFullScreen={false} />}>
                {children ?? <Outlet />}
              </Suspense>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      <ScrollRestoration />
    </>
  );
};
