import { AppDrawer } from '@/components/app-drawer';
import { normalizeQueryParamValue } from '@/components/app-filter/helper';
import { BookingDetailDrawerContent } from '@/features/flight-management/components/flight-booking/booking-detail-drawer-content';
import { useGetFlightBookingDetailQuery } from '@/features/flight-management/query';
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
  const normalizeId = normalizeQueryParamValue(bookingId);

  const queryArg = !normalizeId || !open ? skipToken : String(normalizeId);

  const { data, isFetching } = useGetFlightBookingDetailQuery(queryArg);

  const detail = data?.data;

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Thông tin đơn hàng"
    >
      <Skeleton loading={isFetching} active>
        <BookingDetailDrawerContent detail={detail} />
      </Skeleton>
    </AppDrawer>
  );
};
