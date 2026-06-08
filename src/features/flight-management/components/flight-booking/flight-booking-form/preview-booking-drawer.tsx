import { AppDrawer } from '@/components/app-ui/app-drawer';
import { Button } from '@/components/ui/button';
import { DrawerClose } from '@/components/ui/drawer';
import { BookingDetailDrawerContent } from '@/features/flight-management/components/flight-booking/booking-detail-drawer-content';
import type { TGetFlightBookingDetailResponse } from '@/features/flight-management/types';
import { useState } from 'react';

type PreviewBookingDrawerProps = {
  detail?: TGetFlightBookingDetailResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
};

export const PreviewBookingDrawer = ({
  detail,
  open,
  onOpenChange,
  onConfirm,
}: PreviewBookingDrawerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsSubmitting(true);
      await onConfirm?.();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Xem trước đơn hàng"
      footer={
        <>
          <DrawerClose asChild>
            <Button
              className="min-w-25"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
          </DrawerClose>
          <Button
            className="min-w-25"
            onClick={handleConfirm}
            loading={isSubmitting}
          >
            Xác nhận
          </Button>
        </>
      }
    >
      <BookingDetailDrawerContent detail={detail} />
    </AppDrawer>
  );
};
