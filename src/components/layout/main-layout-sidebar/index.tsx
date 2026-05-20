import * as React from 'react';

import LogoIconImg from '@/assets/images/logo.png';
import { sidebarData } from '@/components/layout/main-layout-sidebar/constants';
import { SidebarNavGroup } from '@/components/layout/main-layout-sidebar/sidebar-nav-group';
import { SidebarUser } from '@/components/layout/main-layout-sidebar/sidebar-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const MainLayoutSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { state } = useSidebar();
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div
                  className={cn(
                    'flex aspect-square size-10 items-center justify-center rounded-lg text-sidebar-primary-foreground transition-all duration-300 ease-in-out dark:bg-gray-100',
                    state === 'collapsed'
                      ? 'size-8'
                      : 'size-10 bg-sidebar-accent'
                  )}
                >
                  <img
                    className="transition-all duration-300 ease-in-out"
                    src={LogoIconImg}
                    alt="Logo"
                    width={state === 'collapsed' ? 20 : 24}
                    height={state === 'collapsed' ? 20 : 24}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-base leading-[20px] font-semibold">
                    Việt An
                  </span>
                  <span className="truncate text-xs">Kho sản phẩm</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent
        className={cn(
          'transition-all duration-300 ease-in-out',
          state === 'collapsed' ? 'pt-4' : ''
        )}
      >
        {sidebarData.navGroups.map(props => (
          <SidebarNavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
