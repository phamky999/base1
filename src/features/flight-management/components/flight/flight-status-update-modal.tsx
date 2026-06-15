import { StatusUpdateModal } from '@/features/flight-management/components/common/status-update-modal';
import {
  FLIGHT_DETAIL_ACTION,
  FLIGHT_DETAIL_ACTION_LABEL,
  FLIGHT_STATUS,
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
} from '@/features/flight-management/constants';
import {
  useCancelFlightMutation,
  useCloseFlightMutation,
  usePublishFlightMutation,
  useReopenFlightMutation,
} from '@/features/flight-management/query';
import type {
  TFlightDetailAction,
  TFlightListItem,
  TFlightStatus,
} from '@/features/flight-management/types';
import { Form } from 'antd';
import { useMemo } from 'react';

type FlightStatusUpdateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: TFlightDetailAction;
  flight: TFlightListItem;
};

export const FlightStatusUpdateModal = ({
  open,
  onOpenChange,
  action,
  flight,
}: FlightStatusUpdateModalProps) => {
  const [form] = Form.useForm();

  const [publishFlightFn] = usePublishFlightMutation();
  const [closeFlightFn] = useCloseFlightMutation();
  const [cancelFlightFn] = useCancelFlightMutation();
  const [reopenFlightFn] = useReopenFlightMutation();

  const actionToStatus = useMemo(() => {
    return {
      [FLIGHT_DETAIL_ACTION.PUBLISH]: FLIGHT_STATUS.ACTIVE,
      [FLIGHT_DETAIL_ACTION.CLOSE]: FLIGHT_STATUS.CLOSED,
      [FLIGHT_DETAIL_ACTION.CANCEL]: FLIGHT_STATUS.CANCELLED,
      [FLIGHT_DETAIL_ACTION.REOPEN]: FLIGHT_STATUS.ACTIVE,
    };
  }, []);

  const mutationConfig = {
    [FLIGHT_DETAIL_ACTION.PUBLISH]: {
      mutationFn: publishFlightFn,
      actionLabel: FLIGHT_DETAIL_ACTION_LABEL.PUBLISH,
    },
    [FLIGHT_DETAIL_ACTION.CLOSE]: {
      mutationFn: closeFlightFn,
      actionLabel: FLIGHT_DETAIL_ACTION_LABEL.CLOSE,
    },
    [FLIGHT_DETAIL_ACTION.CANCEL]: {
      mutationFn: cancelFlightFn,
      actionLabel: FLIGHT_DETAIL_ACTION_LABEL.CANCEL,
    },
    [FLIGHT_DETAIL_ACTION.REOPEN]: {
      mutationFn: reopenFlightFn,
      actionLabel: FLIGHT_DETAIL_ACTION_LABEL.REOPEN,
    },
  };

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  return (
    <StatusUpdateModal<TFlightStatus, TFlightDetailAction>
      open={open}
      onOpenChange={handleOpenChange}
      action={action}
      entity={flight}
      actionToStatus={actionToStatus}
      mutationConfig={mutationConfig}
      statusLabel={FLIGHT_STATUS_LABEL}
      statusColor={FLIGHT_STATUS_COLOR}
      entityLabel="chuyến bay"
    />
  );
};
