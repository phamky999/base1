import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { XIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const AppDrawer = ({
  open,
  onOpenChange,
  children,
  title,
  headerAddon,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title: string;
  headerAddon?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="w-full! md:max-w-[80dvw]! lg:max-w-200!">
        <DrawerHeader className="flex flex-row items-center justify-start! gap-2 border-b py-3!">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
          <DrawerTitle className="mr-auto">{title}</DrawerTitle>
          {headerAddon && <div>{headerAddon}</div>}
        </DrawerHeader>
        <div data-vaul-no-drag className="overflow-y-auto p-4 select-text!">
          {children}
        </div>
        {!!footer && (
          <DrawerFooter className="flex-row! flex-wrap items-center justify-end! gap-4! border-t py-3!">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
