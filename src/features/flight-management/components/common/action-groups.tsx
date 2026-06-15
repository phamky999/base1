import { AppTooltip } from '@/components/app-ui/app-tooltip';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { EllipsisVerticalIcon } from 'lucide-react';

export type ActionGroupItem<T extends string = string> = {
  key: T;
  label: string;
  icon: React.ReactNode;
  danger?: boolean;
};

type ActionGroupsProps<T extends string = string> = {
  actions: ActionGroupItem<T>[];
  onActionClick: (key: T) => void;
  disabledActions?: T[];
  maxIconButtons?: number;
  dropdownThreshold?: number;
  className?: string;
};

export const ActionGroups = <T extends string = string>({
  actions,
  onActionClick,
  disabledActions,
  maxIconButtons = 2,
  dropdownThreshold = 4,
  className,
}: ActionGroupsProps<T>) => {
  const useDropdown = actions.length >= dropdownThreshold;
  const iconButtonActions = useDropdown
    ? actions.slice(0, maxIconButtons)
    : actions;
  const dropdownActions = useDropdown ? actions.slice(maxIconButtons) : [];

  return (
    <div
      className={cn('flex items-center', className)}
      onClick={e => e.stopPropagation()}
    >
      {iconButtonActions.map(action => (
        <AppTooltip key={action.key} content={action.label}>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={() => onActionClick(action.key)}
            disabled={disabledActions?.includes(action.key)}
          >
            {action.icon}
          </Button>
        </AppTooltip>
      ))}

      {Boolean(useDropdown && dropdownActions.length > 0) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <EllipsisVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-1001 min-w-50">
            {dropdownActions.map(action => (
              <DropdownMenuItem
                key={action.key}
                disabled={disabledActions?.includes(action.key)}
                onClick={() => onActionClick(action.key)}
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
    </div>
  );
};
