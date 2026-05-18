import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BookingDetailLogsDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-logs-drawer';
import { EllipsisVerticalIcon, HistoryIcon } from 'lucide-react';
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon-sm'}>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-1001 min-w-40">
          {!!addon && addon}
          <DropdownMenuItem>
            <div
              className="flex w-full cursor-pointer items-center gap-2"
              onClick={() => setIsLogDrawerOpen(true)}
            >
              <span className="mb-0.5">
                <HistoryIcon className="size-4" />
              </span>
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
