import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

const PreloadHeader = () => (
  <header className="sticky top-0 z-50 flex w-full items-center bg-(--main-background) md:pt-2 md:pr-2 md:pl-2">
    <div className="flex h-12.5 w-full items-center gap-2 border-b bg-background px-4 md:rounded-lg md:border md:shadow-xs">
      <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
      <div className="mr-2 h-4 w-px shrink-0 bg-border" />
      <Skeleton className="ml-auto h-8 w-30 sm:w-40" />
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </header>
);

const PreloadSidebar = () => (
  <Sidebar variant="floating" collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex h-12 items-center gap-2 rounded-md px-2">
            <Skeleton className="size-10 shrink-0 rounded-lg" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-5 w-8 shrink-0 rounded-sm" />
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="h-8">
          <Skeleton className="h-3 w-12" />
        </SidebarGroupLabel>
        <SidebarMenu className="space-y-0.5">
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuItem>
            <div className="flex h-8 items-center gap-2 rounded-md px-2">
              <Skeleton className="size-4 shrink-0 rounded-md" />
              <Skeleton className="h-4 min-w-0 flex-1 max-w-[60%]" />
              <Skeleton className="ms-auto size-4 shrink-0 rounded-sm" />
            </div>
          </SidebarMenuItem>
          <SidebarMenuSkeleton showIcon />
          <SidebarMenuItem>
            <div className="flex h-8 items-center gap-2 rounded-md px-2">
              <Skeleton className="size-4 shrink-0 rounded-md" />
              <Skeleton className="h-4 min-w-0 flex-1 max-w-[50%]" />
              <Skeleton className="ms-auto size-4 shrink-0 rounded-sm" />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <div className="flex h-12 items-center gap-2 rounded-md px-2">
        <Skeleton className="size-8 shrink-0 rounded-full" />
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="ms-auto size-4 shrink-0" />
      </div>
    </SidebarFooter>
  </Sidebar>
);

const PreloadContent = () => (
  <div className="min-h-svh flex-1 bg-(--main-background) p-4 py-4! md:p-2" />
);

export const MainLayoutPreload = () => {
  return (
    <SidebarProvider>
      <PreloadSidebar />
      <SidebarInset
        className={cn(
          '@container/content',
          'has-data-[layout=fixed]:h-svh',
          'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]',
          'min-w-0'
        )}
      >
        <PreloadHeader />
        <PreloadContent />
      </SidebarInset>
    </SidebarProvider>
  );
};
