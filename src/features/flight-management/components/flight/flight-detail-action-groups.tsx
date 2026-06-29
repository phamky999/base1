import { AppConfirmModal } from '@/components/app-ui/app-confirm-modal';
import { ActionGroups } from '@/features/flight-management/components/common/action-groups';
import { FlightDetailDrawer } from '@/features/flight-management/components/flight/flight-detail-drawer';
import { FlightDetailLogsDrawer } from '@/features/flight-management/components/flight/flight-detail-logs-drawer';
import { FlightScheduleUpdateDrawer } from '@/features/flight-management/components/flight/flight-schedule-update-drawer';
import { FlightStatusUpdateModal } from '@/features/flight-management/components/flight/flight-status-update-modal';
import {
  FLIGHT_DETAIL_ACTION,
  FLIGHT_DETAIL_ACTION_LABEL,
} from '@/features/flight-management/constants';
import { useDeleteFlightMutation } from '@/features/flight-management/query';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TFlightDetailAction,
  TFlightDetailActionConfig,
  TFlightListItem,
} from '@/features/flight-management/types';
import type { StrictUnion } from '@/lib/types';
import {
  CircleSlashIcon,
  ClipboardListIcon,
  CopyIcon,
  EyeIcon,
  HistoryIcon,
  PlaneIcon,
  SquarePenIcon,
  TicketCheckIcon,
  TicketXIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type FlightDetailActionGroupsProps = {
  flight: StrictUnion<TFlightListItem | TFlightListItem> | null;
  onActionSuccess?: () => void;
  ignoredActions?: TFlightDetailAction[];
};

const FLIGHT_DETAIL_ACTION_CONFIG: Partial<
  Record<TFlightDetailAction, TFlightDetailActionConfig>
> = {
  [FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST],
    icon: <ClipboardListIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST),
  },
  [FLIGHT_DETAIL_ACTION.UPDATE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.UPDATE],
    icon: <SquarePenIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.UPDATE),
  },
  [FLIGHT_DETAIL_ACTION.VIEW_DETAIL]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.VIEW_DETAIL],
    icon: <EyeIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.VIEW_DETAIL),
  },
  [FLIGHT_DETAIL_ACTION.DUPLICATE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.DUPLICATE],
    icon: <CopyIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.DUPLICATE),
  },
  [FLIGHT_DETAIL_ACTION.VIEW_LOGS]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.VIEW_LOGS],
    icon: <HistoryIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.VIEW_LOGS),
  },
  [FLIGHT_DETAIL_ACTION.SCHEDULE_CHANGE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.SCHEDULE_CHANGE],
    icon: <PlaneIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.SCHEDULE_CHANGE),
  },
  [FLIGHT_DETAIL_ACTION.PUBLISH]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.PUBLISH],
    icon: <TicketCheckIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.PUBLISH),
  },
  [FLIGHT_DETAIL_ACTION.REOPEN]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.REOPEN],
    icon: <TicketCheckIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.REOPEN),
  },
  [FLIGHT_DETAIL_ACTION.CLOSE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.CLOSE],
    icon: <TicketXIcon className="size-4" />,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.CLOSE),
  },
  [FLIGHT_DETAIL_ACTION.CANCEL]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.CANCEL],
    icon: <CircleSlashIcon className="size-4" />,
    danger: true,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.CANCEL),
  },
  [FLIGHT_DETAIL_ACTION.DELETE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.DELETE],
    icon: <Trash2Icon className="size-4" />,
    danger: true,
    visible: ({ can }) => can(FLIGHT_DETAIL_ACTION.DELETE),
  },
};

export const FlightDetailActionGroups = ({
  flight,
  onActionSuccess,
  ignoredActions,
}: FlightDetailActionGroupsProps) => {
  const navigate = useNavigate();

  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isScheduleUpdateDrawerOpen, setIsScheduleUpdateDrawerOpen] =
    useState(false);

  const [isConfirmDeleteDrawerOpen, setIsConfirmDeleteDrawerOpen] =
    useState(false);

  const [selectedAction, setSelectedAction] =
    useState<TFlightDetailAction | null>(null);

  const [deleteFlightFn, { isLoading: isDeleting }] = useDeleteFlightMutation();

  const allAllowedActions = [
    ...(flight?.allowedActions || []),
    ...[
      FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST,
      FLIGHT_DETAIL_ACTION.VIEW_LOGS,
      FLIGHT_DETAIL_ACTION.VIEW_DETAIL,
      FLIGHT_DETAIL_ACTION.DUPLICATE,
    ],
  ];

  const can = (action: TFlightDetailAction) =>
    allAllowedActions.includes(action);

  const handleDelete = async () => {
    if (!flight?.id) return;
    try {
      await deleteFlightFn(flight.id).unwrap();
      toast.success('Xoá chuyến bay thành công');
      onActionSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewBookings = () => {
    if (!flight?.id) return;
    navigate({
      pathname: flightManagementPaths.bookingList.fullPath,
      search: `flightId=${flight.id}`,
    });
  };

  const handleNavigateToAddEditPage = (isDuplicate?: boolean) => {
    if (!flight?.id) return;

    if (isDuplicate) {
      navigate({
        pathname: flightManagementPaths.createFlight.fullPath,
        search: `duplicateId=${flight.id}`,
      });
      return;
    }
    navigate(flightManagementPaths.flightDetail.buildFullPath(flight.id));
  };

  const isActionVisible = (key: TFlightDetailAction): boolean => {
    const config = FLIGHT_DETAIL_ACTION_CONFIG[key];
    if (!config) return false;
    return config.visible?.({ can }) ?? false;
  };

  const allRenderableActions = Object.entries(FLIGHT_DETAIL_ACTION_CONFIG)
    .filter(([key]) => !ignoredActions?.includes(key as TFlightDetailAction))
    .filter(([key]) => isActionVisible(key as TFlightDetailAction))
    .map(([key, value]) => ({ key: key as TFlightDetailAction, ...value }));

  const handleActionClick = (key: TFlightDetailAction) => {
    if (key === FLIGHT_DETAIL_ACTION.VIEW_DETAIL)
      return setIsDetailDrawerOpen(true);

    if (key === FLIGHT_DETAIL_ACTION.DUPLICATE)
      return handleNavigateToAddEditPage(true);

    if (key === FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST)
      return handleViewBookings();
    if (key === FLIGHT_DETAIL_ACTION.VIEW_LOGS) return setIsLogDrawerOpen(true);
    if (key === FLIGHT_DETAIL_ACTION.UPDATE)
      return handleNavigateToAddEditPage();
    if (key === FLIGHT_DETAIL_ACTION.DELETE)
      return setIsConfirmDeleteDrawerOpen(true);

    if (key === FLIGHT_DETAIL_ACTION.SCHEDULE_CHANGE)
      return setIsScheduleUpdateDrawerOpen(true);

    setSelectedAction(key);
  };

  return (
    <div className="flex items-center" onClick={e => e.stopPropagation()}>
      <ActionGroups<TFlightDetailAction>
        actions={allRenderableActions}
        onActionClick={handleActionClick}
        disabledActions={isDeleting ? [FLIGHT_DETAIL_ACTION.DELETE] : []}
      />

      {!!flight?.id && (
        <FlightDetailLogsDrawer
          flightId={flight.id}
          open={isLogDrawerOpen}
          onOpenChange={setIsLogDrawerOpen}
        />
      )}
      {!!selectedAction && flight && (
        <FlightStatusUpdateModal
          action={selectedAction}
          flight={flight}
          open={!!selectedAction}
          onOpenChange={open => {
            if (!open) setSelectedAction(null);
          }}
        />
      )}

      <FlightDetailDrawer
        flightId={flight?.id}
        open={isDetailDrawerOpen}
        onOpenChange={setIsDetailDrawerOpen}
      />

      <FlightScheduleUpdateDrawer
        flightId={flight?.id}
        transactionCode={flight?.transactionCode}
        open={isScheduleUpdateDrawerOpen}
        onOpenChange={setIsScheduleUpdateDrawerOpen}
      />

      <AppConfirmModal
        open={isConfirmDeleteDrawerOpen}
        onOpenChange={setIsConfirmDeleteDrawerOpen}
        title="Xoá chuyến bay"
        description={`Bạn có chắc chắn muốn xoá chuyến bay  ${flight?.transactionCode}?`}
        onConfirm={handleDelete}
        confirmButtonProps={{
          variant: 'destructive',
        }}
      />
    </div>
  );
};
