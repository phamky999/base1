import { AppDateTimeLabel } from '@/components/app-date-time-label';
import { AppDrawer } from '@/components/app-drawer';
import { normalizeQueryParamValue } from '@/components/app-filter/helper';
import {
  FLIGHT_BOOKING_ACTION_COLOR,
  FLIGHT_BOOKING_ACTION_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightBookingDetailLogsQuery } from '@/features/flight-management/query';
import { skipToken } from '@reduxjs/toolkit/query';
import { Empty, Skeleton, Tag, Timeline } from 'antd';

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
    <AppDrawer open={open} onOpenChange={onOpenChange} title="Lịch sử cập nhật">
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
    </AppDrawer>
  );
};
