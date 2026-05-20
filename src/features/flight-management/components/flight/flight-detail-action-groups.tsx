import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FlightDetailLogsDrawer } from '@/features/flight-management/components/flight/flight-detail-logs-drawer';
import { UpdateFlightStatusModal } from '@/features/flight-management/components/flight/update-flight-status-modal';
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
import { cn } from '@/lib/utils';
import { Modal, Tooltip } from 'antd';
import {
  CircleSlashIcon,
  ClipboardListIcon,
  EllipsisVerticalIcon,
  HistoryIcon,
  PlusIcon,
  SquarePenIcon,
  TicketCheckIcon,
  TicketXIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type FlightDetailActionGroupsProps = {
  flight: StrictUnion<TFlightListItem | TFlightListItem> | null;
  onActionSuccess?: () => void;
  addon?: ReactNode;
};

const FLIGHT_DETAIL_ACTION_CONFIG: Record<
  TFlightDetailAction,
  TFlightDetailActionConfig
> = {
  [FLIGHT_DETAIL_ACTION.ADD]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.ADD],
    icon: <PlusIcon className="size-4" />,
    manualRender: true,
    priority: 0,
  },
  [FLIGHT_DETAIL_ACTION.VIEW_LOGS]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.VIEW_LOGS],
    icon: <HistoryIcon className="size-4" />,
    manualRender: true,
    priority: 994,
  },
  [FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST],
    icon: <ClipboardListIcon className="size-4" />,
    manualRender: true,
    priority: 999,
  },
  [FLIGHT_DETAIL_ACTION.UPDATE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.UPDATE],
    icon: <SquarePenIcon className="size-4" />,
    manualRender: true,
    priority: 998,
  },
  [FLIGHT_DETAIL_ACTION.DELETE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.DELETE],
    icon: <Trash2Icon className="size-4" />,
    danger: true,
    manualRender: true,
    priority: 1,
  },
  [FLIGHT_DETAIL_ACTION.PUBLISH]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.PUBLISH],
    icon: <TicketCheckIcon className="size-4" />,
    priority: 997,
  },
  [FLIGHT_DETAIL_ACTION.CLOSE]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.CLOSE],
    icon: <TicketXIcon className="size-4" />,
    priority: 995,
  },
  [FLIGHT_DETAIL_ACTION.REOPEN]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.REOPEN],
    icon: <TicketCheckIcon className="size-4" />,
    priority: 996,
  },
  [FLIGHT_DETAIL_ACTION.CANCEL]: {
    label: FLIGHT_DETAIL_ACTION_LABEL[FLIGHT_DETAIL_ACTION.CANCEL],
    icon: <CircleSlashIcon className="size-4" />,
    danger: true,
    priority: 2,
  },
};

export const FlightDetailActionGroups = ({
  flight,
  onActionSuccess,
  addon,
}: FlightDetailActionGroupsProps) => {
  const navigate = useNavigate();

  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);

  const [selectedAction, setSelectedAction] =
    useState<TFlightDetailAction | null>(null);

  const [deleteFlightFn, { isLoading: isDeleting }] = useDeleteFlightMutation();

  const can = (action: TFlightDetailAction) =>
    (flight?.allowedActions || []).includes(action);

  const handleDelete = () => {
    Modal.confirm({
      icon: null,
      title: 'Xoá chuyến bay',
      content: 'Bạn có chắc chắn muốn xoá chuyến bay này?',
      okText: 'Xoá',
      cancelText: 'Huỷ',
      onOk: async () => {
        if (!flight?.id) return;
        try {
          await deleteFlightFn(flight.id).unwrap();
          toast.success('Xoá chuyến bay thành công');
          onActionSuccess?.();
        } catch (error) {
          console.error(error);
        }
      },
      okButtonProps: {
        loading: isDeleting,
        danger: true,
      },
      cancelButtonProps: {
        disabled: isDeleting,
      },
    });
  };

  const handleViewBookings = () => {
    if (!flight?.id) return;
    navigate({
      pathname: flightManagementPaths.bookingList.fullPath,
      search: `flightId=${flight.id}`,
    });
  };

  const handleUpdate = () => {
    if (!flight?.id) return;
    navigate(flightManagementPaths.flightDetail.buildFullPath(flight.id));
  };

  const isActionVisible = (key: TFlightDetailAction): boolean => {
    if (key === FLIGHT_DETAIL_ACTION.ADD) return false;
    const config = FLIGHT_DETAIL_ACTION_CONFIG[key];
    if (!config.manualRender) return can(key);
    if (key === FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST) return true;
    if (key === FLIGHT_DETAIL_ACTION.VIEW_LOGS) return true;
    if (key === FLIGHT_DETAIL_ACTION.UPDATE) return can(key);
    if (key === FLIGHT_DETAIL_ACTION.DELETE) return can(key);
    return false;
  };

  const allRenderableActions = Object.entries(FLIGHT_DETAIL_ACTION_CONFIG)
    .filter(([key]) => isActionVisible(key as TFlightDetailAction))
    .map(([key, value]) => ({ key: key as TFlightDetailAction, ...value }))
    .sort((a, b) => b.priority - a.priority);

  const totalActions = allRenderableActions.length;

  const useDropdown = totalActions >= 4;
  const iconButtonActions = useDropdown
    ? allRenderableActions.slice(0, 2)
    : allRenderableActions;
  const dropdownActions = useDropdown ? allRenderableActions.slice(2) : [];

  const handleActionClick = (key: TFlightDetailAction) => {
    if (key === FLIGHT_DETAIL_ACTION.VIEW_BOOKING_LIST)
      return handleViewBookings();
    if (key === FLIGHT_DETAIL_ACTION.VIEW_LOGS) return setIsLogDrawerOpen(true);
    if (key === FLIGHT_DETAIL_ACTION.UPDATE) return handleUpdate();
    if (key === FLIGHT_DETAIL_ACTION.DELETE) return handleDelete();
    setSelectedAction(key);
  };

  return (
    <div className="flex items-center" onClick={e => e.stopPropagation()}>
      {iconButtonActions.map(action => (
        <Tooltip key={action.key} title={action.label}>
          <Button
            size={'icon-sm'}
            variant={'ghost'}
            onClick={() => handleActionClick(action.key)}
            disabled={action.key === FLIGHT_DETAIL_ACTION.DELETE && isDeleting}
          >
            {action.icon}
          </Button>
        </Tooltip>
      ))}

      {(!!addon || Boolean(useDropdown && dropdownActions.length > 0)) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'ghost'} size={'icon-sm'}>
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-1001 min-w-50">
            {!!addon && addon}
            {dropdownActions.map(action => (
              <DropdownMenuItem
                key={action.key}
                disabled={
                  action.key === FLIGHT_DETAIL_ACTION.DELETE && isDeleting
                }
                onClick={() => handleActionClick(action.key)}
              >
                <div
                  className={cn(
                    'flex items-center gap-2',
                    action.danger && 'text-red-500'
                  )}
                >
                  <span className="mb-0.5">{action.icon}</span>
                  {action.label}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!!flight?.id && (
        <FlightDetailLogsDrawer
          flightId={flight.id}
          open={isLogDrawerOpen}
          onOpenChange={setIsLogDrawerOpen}
        />
      )}
      {!!selectedAction && flight && (
        <UpdateFlightStatusModal
          action={selectedAction}
          flight={flight}
          open={!!selectedAction}
          onOpenChange={open => {
            if (!open) setSelectedAction(null);
          }}
        />
      )}
    </div>
  );
};
