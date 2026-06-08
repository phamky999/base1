import { AppDrawer } from '@/components/app-ui/app-drawer';
import { FlightList } from '@/features/flight-management/components/flight/flight-list';
import type { TFlightListItem } from '@/features/flight-management/types';

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
    <AppDrawer open={open} onOpenChange={onOpenChange} title="Chọn chuyến bay">
      <FlightList
        showFlightActiveOnly
        showInSelectFlightDrawer
        customOnSelectRecord={onSelectFlight}
      />
    </AppDrawer>
  );
};
