import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { BookingDetailDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-drawer';
import { BookingDetailLogsDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-logs-drawer';
import { EyeIcon, HistoryIcon } from 'lucide-react';
import { useState } from 'react';

type BookingDetailActionGroupsProps = {
  bookingId: string;
  hiddenViewDetail?: boolean;
};

export const BookingDetailActionGroups = ({
  bookingId,
  hiddenViewDetail,
}: BookingDetailActionGroupsProps) => {
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [isViewDetailOpen, setIsViewDetailOpen] = useState(false);

  const handleViewDetail = () => {
    setIsViewDetailOpen(true);
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      {!hiddenViewDetail && (
        <AppTooltip content="Chi tiết đơn hàng">
          <Button size={'icon-sm'} variant={'ghost'} onClick={handleViewDetail}>
            <EyeIcon className="size-4" />
          </Button>
        </AppTooltip>
      )}

      <AppTooltip content="Lịch sử cập nhật">
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          onClick={() => setIsLogDrawerOpen(true)}
        >
          <HistoryIcon className="size-4" />
        </Button>
      </AppTooltip>

      <BookingDetailLogsDrawer
        bookingId={bookingId}
        open={isLogDrawerOpen}
        onOpenChange={() => setIsLogDrawerOpen(false)}
      />
      <BookingDetailDrawer
        bookingId={bookingId}
        open={isViewDetailOpen}
        onOpenChange={setIsViewDetailOpen}
      />
    </div>
  );
};
