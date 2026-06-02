import { AppTooltip } from '@/components/app-tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  CirclePlusIcon,
  ClipboardListIcon,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ModuleCardProps = {
  moduleIcon: LucideIcon;
  moduleName: string;
  description: string;
  viewListPath: string;
  createPath: string;
  viewBookingPath: string;
  isReleased?: boolean;
};

export const ModuleCard = ({
  moduleIcon: Icon,
  moduleName,
  description,
  viewListPath,
  createPath,
  viewBookingPath,
  isReleased = true,
}: ModuleCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        'card space-y-4',
        !isReleased && 'cursor-not-allowed opacity-50'
      )}
    >
      <div className="flex justify-between gap-4">
        <div className="w-fit rounded-lg bg-muted p-3">
          <Icon className="size-6 text-primary" />
        </div>
        {isReleased ? (
          <AppTooltip content={`Xem danh sách ${moduleName}`}>
            <Button variant={'link'} onClick={() => navigate(viewListPath)}>
              Xem danh sách
            </Button>
          </AppTooltip>
        ) : (
          <span className="h-fit rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
            Sắp ra mắt
          </span>
        )}
      </div>

      <div className="space-y-0.5">
        <p className="text-base font-semibold">Kho {moduleName}</p>
        <p className="text-foreground">{description}</p>
      </div>

      {isReleased && (
        <div className="flex justify-between gap-4">
          <AppTooltip content="Xem danh sách đơn hàng">
            <Button
              variant={'outline'}
              className="flex-1"
              onClick={() => navigate(viewBookingPath)}
            >
              <ClipboardListIcon className="mr-2 size-4" />
              Đơn hàng
            </Button>
          </AppTooltip>
          <AppTooltip content="Tạo chuyến bay mới">
            <Button className="flex-1" onClick={() => navigate(createPath)}>
              <CirclePlusIcon className="mr-2 size-4" />
              Tạo mới
            </Button>
          </AppTooltip>
        </div>
      )}
    </div>
  );
};
