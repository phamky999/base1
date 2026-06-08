import { normalizeQueryParamValue } from '@/components/app-ui/app-filter/helper';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FlightDetailDrawer } from '@/features/flight-management/components/flight/flight-detail-drawer';
import {
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
} from '@/features/flight-management/constants';
import { useGetFlightDetailQuery } from '@/features/flight-management/query';
import { cn } from '@/lib/utils';
import { skipToken } from '@reduxjs/toolkit/query';
import { Tag } from 'antd';
import { useState } from 'react';

const InfoItem = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: React.ReactNode;
  loading: boolean;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      {loading ? (
        <Skeleton className="h-6.5 w-24" />
      ) : (
        <div className="font-semibold">{value}</div>
      )}
    </div>
  );
};

export const BookingFlightInfo = ({
  flightId,
  className,
}: {
  flightId?: string;
  className?: string;
}) => {
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);

  const normalizeFlightId = normalizeQueryParamValue(flightId);

  const queryArg = !normalizeFlightId ? skipToken : String(normalizeFlightId);

  const { data, isFetching } = useGetFlightDetailQuery(queryArg);

  if (!normalizeFlightId) return null;

  const detail = data?.data;

  const stats = [
    {
      label: 'Hãng',
      value: detail?.airlineName,
    },
    {
      label: 'Số hiệu',
      value: detail?.flightNumbers?.join(', '),
    },
    {
      label: 'Loại máy bay',
      value: detail?.planes?.join(', '),
    },

    {
      label: 'Số ghế',
      value: `${detail?.seatAvailable || '---'} / ${detail?.seatTotal || '---'}`,
    },
    {
      label: 'Hạng',
      value: [
        ...(detail?.departureSegments ?? []),
        ...(detail?.returnSegments ?? []),
      ]
        .map(segment => segment.seatClass)
        .join(', '),
    },
    {
      label: 'Trạng thái',
      value: detail?.status ? (
        <Tag
          className="px-2 py-0.5"
          color={FLIGHT_STATUS_COLOR[detail?.status]}
          variant="outlined"
        >
          {FLIGHT_STATUS_LABEL[detail?.status]}
        </Tag>
      ) : (
        '---'
      ),
    },
  ];

  return (
    <div className={cn('card', className)}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Thông tin chuyến bay</p>

          <Button
            size={'sm'}
            variant={'link'}
            onClick={() => {
              setIsDetailDrawerOpen(true);
            }}
            className="text-sm"
          >
            Xem chi tiết
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map(item => (
          <InfoItem
            key={item.label}
            label={item.label}
            value={item.value}
            loading={isFetching}
          />
        ))}
      </div>

      <FlightDetailDrawer
        flightId={flightId}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />
    </div>
  );
};
