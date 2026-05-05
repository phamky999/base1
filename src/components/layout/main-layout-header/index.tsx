import { AppBreadcrumbs } from '@/components/app-breadcrumbs';
import { HeaderThemeSwitch } from '@/components/layout/main-layout-header/header-theme-switch';
import { HeaderCommandSearch } from '@/components/layout/main-layout-header/heaser-command-search';
import { sidebarData } from '@/components/layout/main-layout-sidebar/constants';
import { SidebarUser } from '@/components/layout/main-layout-sidebar/sidebar-user';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarIcon } from 'lucide-react';

export const MainLayoutHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-sidebar py-3">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 self-center!" />

        <div className="hidden md:block">
          <AppBreadcrumbs />
        </div>

        <div className="ml-auto">
          <HeaderCommandSearch />
        </div>

        <HeaderThemeSwitch />
        <SidebarUser showInHeader user={sidebarData?.user} />
      </div>
    </header>
  );
};
