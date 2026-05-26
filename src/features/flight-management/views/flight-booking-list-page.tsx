import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { BookingFlightInfo } from '@/features/flight-management/components/flight-booking/booking-flight-info';
import { FlightBookingList } from '@/features/flight-management/components/flight-booking/booking-list';
import { FlightBookingListFilter } from '@/features/flight-management/components/flight-booking/booking-list-filter';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FlightBookingListPage = () => {
  const navigate = useNavigate();

  const { queryParams } = useQueryHandle();
  const flightId = queryParams?.flightId;

  return (
    <>
      <PageHelmet title="Danh sách đơn hàng | Kho vé máy bay" />
      <AppPageHeader
        title={
          <span className="flex items-center gap-2">
            {flightId ? (
              <AppTooltip content="Xem tất cả đơn hàng">
                <Button
                  size={'icon-sm'}
                  variant={'ghost'}
                  onClick={() =>
                    navigate(flightManagementPaths.bookingList.fullPath)
                  }
                >
                  <ArrowLeftIcon className="size-4" />
                </Button>
              </AppTooltip>
            ) : null}
            Danh sách đơn hàng
          </span>
        }
      />
      <div className="space-y-6">
        <FlightBookingListFilter />
        {!!flightId && <BookingFlightInfo flightId={flightId} />}
        {/* <FlightBookingStatistics /> */}
        <FlightBookingList />
      </div>
    </>
  );
};
