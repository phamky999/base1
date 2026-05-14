import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FlightDetailLogsDrawer } from '@/features/flight-management/components/flight/flight-detail-logs-drawer';
import { useDeleteFlightMutation } from '@/features/flight-management/query';
import { flightManagementPaths } from '@/features/flight-management/routes';
import { Modal, Tooltip } from 'antd';
import {
  ClipboardListIcon,
  EllipsisVerticalIcon,
  HistoryIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type FlightDetailActionGroupsProps = {
  flightId: string;
  onActionSuccess?: () => void;
};

export const FlightDetailActionGroups = ({
  flightId,
  onActionSuccess,
}: FlightDetailActionGroupsProps) => {
  const navigate = useNavigate();

  const [isLogDrawerOpen, setIsLogDrawerOpen] = useState(false);

  const [deleteFlightFn, { isLoading: isDeleting }] = useDeleteFlightMutation();

  return (
    <div onClick={e => e.stopPropagation()}>
      <Tooltip title="Xem danh sách đơn hàng">
        <Button
          size={'icon-sm'}
          onClick={() => {
            navigate({
              pathname: flightManagementPaths.bookingList.fullPath,
              search: `flightId=${flightId}`,
            });
          }}
          variant={'ghost'}
        >
          <ClipboardListIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Chỉnh sửa chuyến bay">
        <Button
          size={'icon-sm'}
          onClick={() =>
            navigate(flightManagementPaths.flightDetail.buildFullPath(flightId))
          }
          variant={'ghost'}
        >
          <SquarePenIcon />
        </Button>
      </Tooltip>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'ghost'} size={'icon-sm'}>
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-1001 min-w-40">
          <DropdownMenuItem>
            <div
              className="flex items-center gap-2"
              onClick={() => setIsLogDrawerOpen(true)}
            >
              <HistoryIcon className="size-3" />
              Lịch sử thay đổi
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              onClick={() => {
                Modal.confirm({
                  icon: null,
                  title: 'Xoá chuyến bay',
                  content: 'Bạn có chắc chắn muốn xoá chuyến bay này?',
                  okText: 'Xoá',
                  cancelText: 'Huỷ',
                  onOk: async () => {
                    try {
                      await deleteFlightFn(flightId).unwrap();
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
              }}
              className="flex items-center gap-2 text-red-500"
            >
              <Trash2Icon className="size-3" />
              Xóa chuyến bay
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FlightDetailLogsDrawer
        flightId={flightId}
        open={isLogDrawerOpen}
        onOpenChange={setIsLogDrawerOpen}
      />
    </div>
  );
};
