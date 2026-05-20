import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { normalizeQueryParamValue } from '@/components/app-filter/helper';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  FLIGHT_BOOKING_ACTION_COLOR,
  FLIGHT_BOOKING_ACTION_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightBookingDetailLogsQuery } from '@/features/flight-management/query';
import { skipToken } from '@reduxjs/toolkit/query';
import { Empty, Skeleton, Tag, Timeline } from 'antd';
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
  const normalizeId = normalizeQueryParamValue(bookingId);

  const queryArg = !normalizeId || !open ? skipToken : String(normalizeId);

  const { data, isFetching } = useGetFlightBookingDetailLogsQuery(queryArg);
  const logs = data?.data;

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-150! max-md:w-full!">
        <DrawerHeader className="flex flex-row items-center justify-start! gap-2">
          <DrawerClose asChild>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              <XIcon className="size-4" />
            </Button>
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
                      <div className="mb-1 flex flex-col items-start gap-1">
                        <AppDateTimeLabel value={log.createdAt} />
                        <Tag
                          variant="outlined"
                          className="px-2.5 py-0.5"
                          color={FLIGHT_BOOKING_ACTION_COLOR[log.action]}
                        >
                          {FLIGHT_BOOKING_ACTION_LABEL[log.action]}
                        </Tag>
                      </div>
                      <div>
                        {!!log?.note && <p className="mb-1">{log.note}</p>}

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
