import { AppDrawer } from '@/components/app-ui/app-drawer';
import { BookingDetailActionGroups } from '@/features/flight-management/components/flight-booking/booking-detail-action-groups';
import { BookingDetailDrawerContent } from '@/features/flight-management/components/flight-booking/booking-detail-drawer-content';
import { FLIGHT_BOOKING_ACTION } from '@/features/flight-management/constants';
import { useGetFlightBookingDetailQuery } from '@/features/flight-management/query';
import type { TGetFlightBookingDetailResponse } from '@/features/flight-management/types';
import { skipToken } from '@reduxjs/toolkit/query';
import { Skeleton } from 'antd';

type BookingDetailDrawerProps = {
  bookingId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BookingDetailDrawer = ({
  bookingId,
  open,
  onOpenChange,
}: BookingDetailDrawerProps) => {
  const queryArg = !bookingId || !open ? skipToken : String(bookingId);

  const { data, isFetching } = useGetFlightBookingDetailQuery(queryArg);

  const detail = data?.data as TGetFlightBookingDetailResponse;

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Thông tin đơn hàng"
      headerAddon={
        <BookingDetailActionGroups
          booking={detail}
          ignoredActions={[FLIGHT_BOOKING_ACTION.VIEW_DETAIL]}
        />
      }
    >
      <Skeleton loading={isFetching} active>
        <BookingDetailDrawerContent detail={detail} />
      </Skeleton>
    </AppDrawer>
  );
};
