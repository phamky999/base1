import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import * as React from 'react';

import { useSidebar } from '@/components/ui/sidebar';

type AppTooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  disableOnMobile?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  delayDuration?: number;
};

export const AppTooltip = React.memo(
  ({
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
  }
);

AppTooltip.displayName = 'AppTooltip';
