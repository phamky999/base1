import { MainLayoutHeader } from "@/components/layout/main-layout-header"
import { MainLayoutSidebar } from "@/components/layout/main-layout-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MainLayoutSidebar />
      <SidebarInset>
        <MainLayoutHeader />
        <div className="bg-gray-50 p-4 dark:bg-gray-950">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
