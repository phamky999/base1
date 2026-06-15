import { ActionGroups } from '@/features/flight-management/components/common/action-groups';
import { BookingDetailDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-drawer';
import { BookingDetailLogsDrawer } from '@/features/flight-management/components/flight-booking/booking-detail-logs-drawer';
import { BookingStatusUpdateModal } from '@/features/flight-management/components/flight-booking/booking-status-update-modal';
import {
  FLIGHT_BOOKING_ACTION,
  FLIGHT_BOOKING_ACTION_LABEL,
} from '@/features/flight-management/constants';
import type {
  TFlightBookingAction,
  TFlightBookingActionConfig,
  TGetFlightBookingDetailResponse,
} from '@/features/flight-management/types';
import {
  CircleSlashIcon,
  CreditCardIcon,
  EyeIcon,
  HistoryIcon,
} from 'lucide-react';
import { useState } from 'react';

type BookingDetailActionGroupsProps = {
  booking: Pick<
    TGetFlightBookingDetailResponse,
    'transactionCode' | 'id' | 'status' | 'allowedActions'
  >;
  onActionSuccess?: () => void;
  ignoredActions?: TFlightBookingAction[];
};

const FLIGHT_BOOKING_ACTION_CONFIG: Partial<
  Record<TFlightBookingAction, TFlightBookingActionConfig>
> = {
  [FLIGHT_BOOKING_ACTION.VIEW_DETAIL]: {
    label: FLIGHT_BOOKING_ACTION_LABEL[FLIGHT_BOOKING_ACTION.VIEW_DETAIL],
    icon: <EyeIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_BOOKING_ACTION.VIEW_DETAIL),
  },
  [FLIGHT_BOOKING_ACTION.VIEW_LOGS]: {
    label: FLIGHT_BOOKING_ACTION_LABEL[FLIGHT_BOOKING_ACTION.VIEW_LOGS],
    icon: <HistoryIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_BOOKING_ACTION.VIEW_LOGS),
  },
  [FLIGHT_BOOKING_ACTION.ISSUE]: {
    label: FLIGHT_BOOKING_ACTION_LABEL[FLIGHT_BOOKING_ACTION.ISSUE],
    icon: <CreditCardIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_BOOKING_ACTION.ISSUE),
  },
  [FLIGHT_BOOKING_ACTION.CANCEL]: {
    label: FLIGHT_BOOKING_ACTION_LABEL[FLIGHT_BOOKING_ACTION.CANCEL],
    icon: <CircleSlashIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_BOOKING_ACTION.CANCEL),
  },
};

export const BookingDetailActionGroups = ({
  booking,
  ignoredActions,
}: BookingDetailActionGroupsProps) => {
  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [isViewDetailOpen, setIsViewDetailOpen] = useState(false);

  const [selectedAction, setSelectedAction] =
    useState<TFlightBookingAction | null>(null);

  const allAllowedActions = [
    ...(booking?.allowedActions || []),
    ...[FLIGHT_BOOKING_ACTION.VIEW_LOGS, FLIGHT_BOOKING_ACTION.VIEW_DETAIL],
  ];

  const can = (action: TFlightBookingAction) =>
    allAllowedActions.includes(action);

  const handleViewDetail = () => {
    setIsViewDetailOpen(true);
  };

  const isActionVisible = (key: TFlightBookingAction): boolean => {
    const config = FLIGHT_BOOKING_ACTION_CONFIG[key];
    if (!config) return false;
    return config.visible?.({ can }) ?? false;
  };

  const allRenderableActions = Object.entries(FLIGHT_BOOKING_ACTION_CONFIG)
    .filter(([key]) => !ignoredActions?.includes(key as TFlightBookingAction))
    .filter(([key]) => isActionVisible(key as TFlightBookingAction))
    .map(([key, value]) => ({ key: key as TFlightBookingAction, ...value }));

  const handleActionClick = (key: TFlightBookingAction) => {
    if (key === FLIGHT_BOOKING_ACTION.VIEW_DETAIL) return handleViewDetail();

    if (key === FLIGHT_BOOKING_ACTION.VIEW_LOGS)
      return setIsLogDrawerOpen(true);

    setSelectedAction(key);
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      <ActionGroups<TFlightBookingAction>
        actions={allRenderableActions}
        onActionClick={handleActionClick}
      />

      {!!selectedAction && booking && (
        <BookingStatusUpdateModal
          action={selectedAction}
          booking={booking}
          open={!!selectedAction}
          onOpenChange={open => {
            if (!open) setSelectedAction(null);
          }}
        />
      )}

      <BookingDetailLogsDrawer
        bookingId={booking?.id}
        open={isLogDrawerOpen}
        onOpenChange={() => setIsLogDrawerOpen(false)}
      />
      <BookingDetailDrawer
        bookingId={booking?.id}
        open={isViewDetailOpen}
        onOpenChange={setIsViewDetailOpen}
      />
    </div>
  );
};
