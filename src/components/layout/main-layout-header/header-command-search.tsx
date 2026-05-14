import { sidebarData } from '@/components/layout/main-layout-sidebar/constants';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/context/theme';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ChevronRight,
  Laptop,
  Moon,
  SearchIcon,
  Sun,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HeaderCommandSearch = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleThemeSwitch = React.useCallback(
    (theme: 'light' | 'dark' | 'system') => {
      setOpen(false);
      setTheme(theme);
    },
    [setTheme]
  );

  const handleNavigate = React.useCallback(
    (url: string) => {
      setOpen(false);
      navigate(url);
    },
    [navigate]
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'group relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-accent sm:w-30 sm:pe-12 md:flex-none lg:w-40 xl:w-50'
        )}
        aria-keyshortcuts="Meta+K Control+K"
        onClick={() => setOpen(true)}
      >
        <SearchIcon
          aria-hidden="true"
          className="absolute inset-s-1.5 top-1/2 -translate-y-1/2"
          size={16}
        />
        <span className="ms-4">Tìm kiếm</span>
      </Button>

      <CommandDialog modal open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Nhập trang, nội dung cần tìm kiếm..." />
        <CommandList>
          <ScrollArea type="hover" className="h-72 pe-1">
            <CommandEmpty>Không tìm thấy kết quả phù hợp.</CommandEmpty>
            {sidebarData.navGroups.map(group => (
              <CommandGroup key={group.title} heading={group.title}>
                {group.items.map((navItem, i) => {
                  if (navItem.url)
                    return (
                      <CommandItem
                        key={`${navItem.url}-${i}`}
                        value={navItem.title}
                        onSelect={() => handleNavigate(navItem.url)}
                      >
                        <div className="flex size-4 items-center justify-center">
                          <ArrowRight className="size-2 text-muted-foreground/80" />
                        </div>
                        {navItem.title}
                      </CommandItem>
                    );

                  return navItem.items?.map((subItem, i) => (
                    <CommandItem
                      key={`${navItem.title}-${subItem.url}-${i}`}
                      value={`${navItem.title}-${subItem.url}`}
                      onSelect={() => handleNavigate(subItem.url)}
                    >
                      <div className="flex size-4 items-center justify-center">
                        <ArrowRight className="size-2 text-muted-foreground/80" />
                      </div>
                      {navItem.title} <ChevronRight /> {subItem.title}
                    </CommandItem>
                  ));
                })}
              </CommandGroup>
            ))}
            <CommandSeparator />
            <CommandGroup heading="Theme">
              <CommandItem onSelect={() => handleThemeSwitch('light')}>
                <Sun /> <span>Light</span>
              </CommandItem>
              <CommandItem onSelect={() => handleThemeSwitch('dark')}>
                <Moon className="scale-90" />
                <span>Dark</span>
              </CommandItem>
              <CommandItem onSelect={() => handleThemeSwitch('system')}>
                <Laptop />
                <span>System</span>
              </CommandItem>
            </CommandGroup>
          </ScrollArea>
        </CommandList>
      </CommandDialog>
    </>
  );
};
