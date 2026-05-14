import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookingDetailLogsDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-logs-drawer';
import { EllipsisVerticalIcon, HistoryIcon } from 'lucide-react';
import { useState } from 'react';

type BookingDetailActionGroupsProps = {
  bookingId: string;
};

export const BookingDetailActionGroups = ({
  bookingId,
}: BookingDetailActionGroupsProps) => {
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);

  return (
    <div onClick={e => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon-sm'}>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-1001 min-w-40">
          <DropdownMenuItem>
            <div
              className="flex w-full cursor-pointer items-center gap-2"
              onClick={() => setIsLogDrawerOpen(true)}
            >
              <HistoryIcon className="size-3" />
              Lịch sử thay đổi
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BookingDetailLogsDrawer
        bookingId={bookingId}
        open={isLogDrawerOpen}
        onOpenChange={() => setIsLogDrawerOpen(false)}
      />
    </div>
  );
};
