import { AppDateTimeLabel } from '@/components/app-ui/app-date-time-label';
import { AppDrawer } from '@/components/app-ui/app-drawer';
import {
  FLIGHT_DETAIL_ACTION_COLOR,
  FLIGHT_DETAIL_ACTION_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightDetailLogsQuery } from '@/features/flight-management/query';
import { skipToken } from '@reduxjs/toolkit/query';
import { Empty, Skeleton, Tag, Timeline } from 'antd';

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
  const queryArg = !flightId || !open ? skipToken : String(flightId);

  const { data, isFetching } = useGetFlightDetailLogsQuery(queryArg);
  const logs = data?.data;

  return (
    <AppDrawer open={open} onOpenChange={onOpenChange} title="Lịch sử cập nhật">
      <Skeleton loading={isFetching} active>
        {logs?.length ? (
          <Timeline
            items={logs.map(log => ({
              content: (
                <>
                  <div className="mb-1 flex flex-col items-start gap-1">
                    <AppDateTimeLabel value={log.createdAt} />
                    <Tag
                      variant="outlined"
                      className="px-2.5 py-0.5"
                      color={FLIGHT_DETAIL_ACTION_COLOR[log.action]}
                    >
                      {FLIGHT_DETAIL_ACTION_LABEL[log.action]}
                    </Tag>
                  </div>
                  <div>
                    {!!log?.note && <p className="mb-1">{log.note}</p>}

                    {!!log?.userName && (
                      <p className="text-xs text-gray-500">
                        Thực hiện bởi: {log.userName}
                      </p>
                    )}
                  </div>
                </>
              ),
            }))}
          />
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Skeleton>
    </AppDrawer>
  );
};
