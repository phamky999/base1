import { Button } from '@/components/ui/button';
import { BookingFlightInfo } from '@/features/flight-management/components/flight-booking/booking-flight-info';
import { FlightSelectionDrawer } from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-selection-drawer';
import type { TFlightListItem } from '@/features/flight-management/types';
import { InfoIcon } from 'lucide-react';
import { useState, type Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

type FlightSelectionSectionProps = {
  selectedFlight: TFlightListItem | null;
  setSelectedFlight: Dispatch<React.SetStateAction<TFlightListItem | null>>;
};

export const FlightSelectionSection = ({
  selectedFlight,
  setSelectedFlight,
}: FlightSelectionSectionProps) => {
  const navigate = useNavigate();

  const [isFlightDrawerOpen, setIsFlightDrawerOpen] = useState(false);

  const handleSelectFlight = (flight: TFlightListItem) => {
    setSelectedFlight(flight);
    setIsFlightDrawerOpen(false);
    navigate(
      {
        search: '',
      },
      {
        replace: true,
        preventScrollReset: true,
      }
    );
  };

  return (
    <>
      <div className="card flex min-h-60 flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-base font-semibold">Thông tin chuyến bay</h3>
          </div>

          {selectedFlight ? (
            <BookingFlightInfo
              flightId={selectedFlight.id}
              className="border-dashed! bg-muted! shadow-none!"
            />
          ) : (
            <div className="card flex flex-col items-center justify-center border-dashed bg-muted shadow-none!">
              <InfoIcon className="mb-2 size-8 text-muted-foreground" />
              <p className="mb-1 text-sm">Chưa chọn chuyến bay</p>
              <p className="text-center text-xs text-muted-foreground">
                Vui lòng click nút phía dưới để chọn chuyến bay từ danh sách
              </p>
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4 flex w-full items-center justify-center gap-2 border-dashed"
          onClick={() => setIsFlightDrawerOpen(true)}
        >
          {selectedFlight ? 'Đổi chuyến bay khác' : 'Chọn chuyến bay'}
        </Button>
      </div>

      <FlightSelectionDrawer
        open={isFlightDrawerOpen}
        onOpenChange={setIsFlightDrawerOpen}
        onSelectFlight={handleSelectFlight}
      />
    </>
  );
};
