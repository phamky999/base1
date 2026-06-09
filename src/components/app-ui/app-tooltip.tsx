import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useSidebar } from '@/components/ui/sidebar';
import { type ReactNode } from 'react';

type AppTooltipProps = {
  children: ReactNode;
  content: ReactNode;
  disableOnMobile?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  delayDuration?: number;
};

export const AppTooltip = ({
  children,
  content,
  disableOnMobile = true,
  side = 'top',
  align = 'center',
}: AppTooltipProps) => {
  const { isMobile } = useSidebar();

  if (disableOnMobile && isMobile) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>

      <TooltipContent side={side} align={align}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
