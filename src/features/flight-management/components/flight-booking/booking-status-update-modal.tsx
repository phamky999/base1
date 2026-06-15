import { StatusUpdateModal } from '@/features/flight-management/components/common/status-update-modal';
import {
  FLIGHT_BOOKING_ACTION,
  FLIGHT_BOOKING_ACTION_LABEL,
  FLIGHT_BOOKING_STATUS,
  FLIGHT_BOOKING_STATUS_COLOR,
  FLIGHT_BOOKING_STATUS_LABEL,
} from '@/features/flight-management/constants';
import {
  useCancelBookingMutation,
  useIssueBookingMutation,
} from '@/features/flight-management/query';
import type {
  TFlightBookingAction,
  TFlightBookingStatus,
  TGetFlightBookingDetailResponse,
} from '@/features/flight-management/types';
import { Form } from 'antd';
import { useMemo } from 'react';

type BookingStatusUpdateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: TFlightBookingAction;
  booking: Pick<
    TGetFlightBookingDetailResponse,
    'transactionCode' | 'id' | 'status'
  >;
};

export const BookingStatusUpdateModal = ({
  open,
  onOpenChange,
  action,
  booking,
}: BookingStatusUpdateModalProps) => {
  const [form] = Form.useForm();

  const [cancelBookingFn] = useCancelBookingMutation();
  const [issueBookingFn] = useIssueBookingMutation();

  const actionToStatus = useMemo(() => {
    return {
      [FLIGHT_BOOKING_ACTION.CANCEL]: FLIGHT_BOOKING_STATUS.CANCELLED,
      [FLIGHT_BOOKING_ACTION.ISSUE]: FLIGHT_BOOKING_STATUS.ISSUED,
    };
  }, []);

  const mutationConfig = {
    [FLIGHT_BOOKING_ACTION.ISSUE]: {
      mutationFn: issueBookingFn,
      actionLabel: FLIGHT_BOOKING_ACTION_LABEL.ISSUE,
    },
    [FLIGHT_BOOKING_ACTION.CANCEL]: {
      mutationFn: cancelBookingFn,
      actionLabel: FLIGHT_BOOKING_ACTION_LABEL.CANCEL,
    },
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  return (
    <StatusUpdateModal<TFlightBookingStatus, TFlightBookingAction>
      open={open}
      onOpenChange={handleOpenChange}
      action={action}
      entity={booking}
      actionToStatus={actionToStatus}
      mutationConfig={mutationConfig}
      statusLabel={FLIGHT_BOOKING_STATUS_LABEL}
      statusColor={FLIGHT_BOOKING_STATUS_COLOR}
      entityLabel=""
    />
  );
};
