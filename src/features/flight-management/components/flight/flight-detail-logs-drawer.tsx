import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { FLIGHT_DETAIL_LOG_ACTION_LABEL } from '@/features/flight-management/constants';
import { useGetFlightDetailLogsQuery } from '@/features/flight-management/query';
import { Empty, Skeleton, Timeline } from 'antd';
import { XIcon } from 'lucide-react';

type FlightDetailLogsDrawerProps = {
  flightId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const FlightDetailLogsDrawer = ({
  flightId,
  open,
  onOpenChange,
}: FlightDetailLogsDrawerProps) => {
  const { data, isFetching } = useGetFlightDetailLogsQuery(flightId || '', {
    skip: !flightId || !open,
  });
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
                  content: (
                    <>
                      <div>
                        <AppDateTimeLabel value={log.createdAt} />
                      </div>
                      <div>
                        <p>
                          <span className="font-semibold">
                            [
                            {FLIGHT_DETAIL_LOG_ACTION_LABEL[log.action] ||
                              log.action}
                            ]
                          </span>{' '}
                          {!!log?.note && <span>{log.note}</span>}
                        </p>

                        <p>Thay đổi bởi: {log.userName}</p>
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
