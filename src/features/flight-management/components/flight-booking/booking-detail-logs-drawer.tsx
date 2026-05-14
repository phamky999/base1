import { AppDateTimeLabel } from '@/components/app-date-time-label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { FLIGHT_BOOKING_LOG_ACTION_LABEL } from '@/features/flight-management/constants';
import { useGetFlightBookingDetailLogsQuery } from '@/features/flight-management/query';
import { Empty, Skeleton, Timeline } from 'antd';
import { XIcon } from 'lucide-react';

type BookingDetailLogsDrawerProps = {
  bookingId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BookingDetailLogsDrawer = ({
  bookingId,
  open,
  onOpenChange,
}: BookingDetailLogsDrawerProps) => {
  const { data, isFetching } = useGetFlightBookingDetailLogsQuery(
    bookingId || '',
    {
      skip: !bookingId || !open,
    }
  );
  const logs = data?.data;

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-150! max-md:w-full!">
        <DrawerHeader className="flex flex-row items-center justify-start! gap-2">
          <DrawerClose>
            <XIcon className="size-4" />
          </DrawerClose>
          <DrawerTitle>Lịch sử cập nhật</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto p-4">
          <Skeleton loading={isFetching} active>
            {logs?.length ? (
              <Timeline
                items={logs.map(log => ({
                  children: (
                    <>
                      <div className="mb-1">
                        <AppDateTimeLabel value={log.createdAt} />
                      </div>
                      <div>
                        <p className="mb-1">
                          <span className="text-brand font-semibold">
                            [
                            {FLIGHT_BOOKING_LOG_ACTION_LABEL[log.action] ||
                              log.action}
                            ]
                          </span>{' '}
                          {!!log?.note && <span>{log.note}</span>}
                        </p>

                        <p className="text-xs text-gray-500">
                          Thực hiện bởi: {log.userName}{' '}
                          {log.merchantName ? `(${log.merchantName})` : ''}
                        </p>
                      </div>
                    </>
                  ),
                }))}
              />
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Skeleton>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
