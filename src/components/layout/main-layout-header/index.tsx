import { HeaderThemeSwitch } from "@/components/layout/main-layout-header/header-theme-switch"
import { HeaderCommandSearch } from "@/components/layout/main-layout-header/heaser-command-search"
import { SidebarUser } from "@/components/layout/main-layout-sidebar/sidebar-user"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { SidebarIcon } from "lucide-react"

export function MainLayoutHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background py-3">
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
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <HeaderCommandSearch />
        </div>

        <HeaderThemeSwitch />
        <SidebarUser
          showInHeader
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </div>
    </header>
  )
}
