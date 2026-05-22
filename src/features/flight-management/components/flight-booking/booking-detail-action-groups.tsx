import { Button } from '@/components/ui/button';
import { BookingDetailLogsDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-logs-drawer';
import { Tooltip } from 'antd';
import { HistoryIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

type BookingDetailActionGroupsProps = {
  bookingId: string;
  addon?: ReactNode;
};

export const BookingDetailActionGroups = ({
  bookingId,
  addon,
}: BookingDetailActionGroupsProps) => {
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);

  return (
    <div onClick={e => e.stopPropagation()}>
      {!!addon && addon}

      <Tooltip title="Lịch sử cập nhật">
        <Button
          size={'icon-sm'}
          variant={'ghost'}
          onClick={() => setIsLogDrawerOpen(true)}
        >
          <HistoryIcon className="size-4" />
        </Button>
      </Tooltip>

      <BookingDetailLogsDrawer
        bookingId={bookingId}
        open={isLogDrawerOpen}
        onOpenChange={() => setIsLogDrawerOpen(false)}
      />
    </div>
  );
};
