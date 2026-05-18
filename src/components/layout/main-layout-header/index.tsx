import { HeaderCommandSearch } from '@/components/layout/main-layout-header/header-command-search';
import { HeaderThemeSwitch } from '@/components/layout/main-layout-header/header-theme-switch';
import { SidebarUser } from '@/components/layout/main-layout-sidebar/sidebar-user';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { SidebarIcon } from 'lucide-react';

export const MainLayoutHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 flex w-full items-center bg-(--main-background) md:pt-2 md:pr-2 md:pl-2">
      <div className="flex h-12.5 w-full items-center gap-2 border-b bg-background px-4 md:rounded-lg md:border md:shadow-sm md:ring-sidebar-border">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 self-center!" />

        <div className="ml-auto">
          <HeaderCommandSearch />
        </div>

        <HeaderThemeSwitch />
        <SidebarUser showInHeader />
      </div>
    </header>
  );
};
