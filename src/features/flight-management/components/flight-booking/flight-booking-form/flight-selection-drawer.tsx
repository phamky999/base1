import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { FlightList } from '@/features/flight-management/components/flight/flight-list';
import type { TFlightListItem } from '@/features/flight-management/types';
import { XIcon } from 'lucide-react';

type FlightSelectionDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectFlight: (record: TFlightListItem) => void;
};

export const FlightSelectionDrawer = ({
  open,
  onOpenChange,
  onSelectFlight,
}: FlightSelectionDrawerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex h-full max-w-3xl! flex-col max-md:w-full!">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DrawerTitle className="text-lg font-bold">
              Chọn chuyến bay
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div data-vaul-no-drag className="flex-1 overflow-y-auto p-4">
          <FlightList
            showFlightActiveOnly
            showInSelectFlightDrawer
            customOnSelectRecord={onSelectFlight}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
