import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button, type AppButtonProps } from '@/components/ui/button';
import { useState } from 'react';

type AppConfirmModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onConfirm: () => Promise<void> | void;
  description?: string;
  confirmButtonProps?: AppButtonProps;
};

export function AppConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmButtonProps,
}: AppConfirmModalProps) {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    try {
      setLoading(true);

      await onConfirm();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> {title}</AlertDialogTitle>
          {!!description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>

          <Button
            {...confirmButtonProps}
            loading={loading}
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
