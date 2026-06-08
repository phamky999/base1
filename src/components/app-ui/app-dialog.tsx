import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ReactNode } from 'react';

export const AppDialog = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  footer,
  dialogContentClassName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  dialogContentClassName?: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={dialogContentClassName}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{title}</DialogTitle>
          {!!description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="dialog-scroll-content">{children}</div>

        {!!footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
