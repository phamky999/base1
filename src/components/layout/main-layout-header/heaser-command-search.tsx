import { useTheme } from "@/context/theme"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  AudioWaveform,
  Bell,
  Bug,
  ChevronRight,
  Command,
  Construction,
  FileX,
  GalleryVerticalEnd,
  HelpCircle,
  Laptop,
  LayoutDashboard,
  ListTodo,
  Lock,
  MessagesSquare,
  Monitor,
  Moon,
  Package,
  Palette,
  SearchIcon,
  ServerOff,
  Settings,
  ShieldCheck,
  Sun,
  UserCog,
  UserX,
  Users,
  Wrench,
} from "lucide-react"
import React, { useState } from "react"

type User = {
  name: string
  email: string
  avatar: string
}

type Team = {
  name: string
  logo: React.ElementType
  plan: string
}

type BaseNavItem = {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: string
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: string })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

type NavGroup = {
  title: string
  items: NavItem[]
}
type SidebarData = {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: LayoutDashboard,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: ListTodo,
        },
        {
          title: "Apps",
          url: "/apps",
          icon: Package,
        },
        {
          title: "Chats",
          url: "/chats",
          badge: "3",
          icon: MessagesSquare,
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
        {
          title: "Secured by Clerk",
          icon: Users,
          items: [
            {
              title: "Sign In",
              url: "/clerk/sign-in",
            },
            {
              title: "Sign Up",
              url: "/clerk/sign-up",
            },
            {
              title: "User Management",
              url: "/clerk/user-management",
            },
          ],
        },
      ],
    },
    {
      title: "Pages",
      items: [
        {
          title: "Auth",
          icon: ShieldCheck,
          items: [
            {
              title: "Sign In",
              url: "/sign-in",
            },
            {
              title: "Sign In (2 Col)",
              url: "/sign-in-2",
            },
            {
              title: "Sign Up",
              url: "/sign-up",
            },
            {
              title: "Forgot Password",
              url: "/forgot-password",
            },
            {
              title: "OTP",
              url: "/otp",
            },
          ],
        },
        {
          title: "Errors",
          icon: Bug,
          items: [
            {
              title: "Unauthorized",
              url: "/errors/unauthorized",
              icon: Lock,
            },
            {
              title: "Forbidden",
              url: "/errors/forbidden",
              icon: UserX,
            },
            {
              title: "Not Found",
              url: "/errors/not-found",
              icon: FileX,
            },
            {
              title: "Internal Server Error",
              url: "/errors/internal-server-error",
              icon: ServerOff,
            },
            {
              title: "Maintenance Error",
              url: "/errors/maintenance-error",
              icon: Construction,
            },
          ],
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: UserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: Wrench,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: Palette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: Bell,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: Monitor,
            },
          ],
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: HelpCircle,
        },
      ],
    },
  ],
}

export function HeaderCommandSearch() {
  //   const navigate = useNavigate()
  const { setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-20 sm:pe-12 md:flex-none lg:w-30 xl:w-40"
        )}
        aria-keyshortcuts="Meta+K Control+K"
        onClick={() => setOpen(true)}
      >
        <SearchIcon
          aria-hidden="true"
          className="absolute inset-s-1.5 top-1/2 -translate-y-1/2"
          size={16}
        />
        <span className="ms-4">Search</span>
      </Button>

      <CommandDialog modal open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <ScrollArea type="hover" className="h-72 pe-1">
            <CommandEmpty>No results found.</CommandEmpty>
            {sidebarData.navGroups.map((group) => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((navItem, i) => {
                  if (navItem.url)
                    return (
                      <CommandItem
                        key={`${navItem.url}-${i}`}
                        value={navItem.title}
                        //   onSelect={() => {
                        //     runCommand(() => navigate({ to: navItem.url }))
                        //   }}
                      >
                        <div className="flex size-4 items-center justify-center">
                          <ArrowRight className="size-2 text-muted-foreground/80" />
                        </div>
                        {navItem.title}
                      </CommandItem>
                    )

                  return navItem.items?.map((subItem, i) => (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${i}`}
                      value={`${navItem.title}-${subItem.url}`}
                      // onSelect={() => {
                      //   runCommand(() => navigate({ to: subItem.url }))
                      // }}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title} <ChevronRight /> {subItem.title}
                    </CommandItem>
                  ))
                })}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                <Sun /> <span>Light</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                <Moon className="scale-90" />
                <span>Dark</span>
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => setTheme("system"))}
              >
                <Laptop />
                <span>System</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  )
}
