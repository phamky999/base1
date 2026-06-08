import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  CirclePlusIcon,
  ClipboardListIcon,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ModuleCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  createBtnLabel: string;
  viewListPath: string;
  createPath: string;
  viewBookingPath: string;
  isReleased?: boolean;
};

export const ModuleCard = ({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  createBtnLabel,
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
        !isReleased && 'cursor-not-allowed opacity-70'
      )}
    >
      <div className="flex justify-start gap-4">
        <div
          className={cn(
            'flex h-13 w-13 shrink-0 items-center justify-center rounded-lg',
            iconBg
          )}
        >
          <Icon className={cn('size-6', iconColor)} />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-muted-foreground">{description}</p>
        </div>
        {isReleased ? (
          <Button variant={'link'} onClick={() => navigate(viewListPath)}>
            Xem danh sách
          </Button>
        ) : (
          <span className="h-fit rounded bg-gray-200 px-2 py-1 text-xs text-gray-700">
            Sắp ra mắt
          </span>
        )}
      </div>

      <div
        className={cn(
          'flex justify-between gap-4',
          !isReleased && 'pointer-events-none'
        )}
      >
        <Button
          variant={'outline'}
          className="flex-1"
          onClick={() => navigate(viewBookingPath)}
        >
          <ClipboardListIcon className="mr-2 size-4" />
          Danh sách đơn hàng
        </Button>

        <Button
          variant={'default'}
          className="flex-1"
          onClick={() => navigate(createPath)}
        >
          <CirclePlusIcon className="mr-2 size-4" />
          {createBtnLabel}
        </Button>
      </div>
    </div>
  );
};
