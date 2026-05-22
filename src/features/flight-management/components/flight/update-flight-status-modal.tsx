import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FLIGHT_STATUS_COLOR,
  FLIGHT_STATUS_LABEL,
} from '@/features/flight-management/constants';
import {
  useCancelFlightMutation,
  useCloseFlightMutation,
  usePublishFlightMutation,
  useReopenFlightMutation,
} from '@/features/flight-management/query';
import type {
  TFlightDetailAction,
  TFlightListItem,
  TFlightStatus,
} from '@/features/flight-management/types';
import { Form, Input, Tag } from 'antd';
import { PlaneIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type UpdateFlightStatusModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: TFlightDetailAction;
  flight: TFlightListItem;
};

export const UpdateFlightStatusModal = ({
  open,
  onOpenChange,
  action,
  flight,
}: UpdateFlightStatusModalProps) => {
  const [form] = Form.useForm();

  const [publishFlightFn] = usePublishFlightMutation();
  const [closeFlightFn] = useCloseFlightMutation();
  const [cancelFlightFn] = useCancelFlightMutation();
  const [reopenFlightFn] = useReopenFlightMutation();

  const [isLoading, setIsLoading] = useState(false);

  const newStatus = useMemo((): TFlightStatus => {
    switch (action) {
      case 'PUBLISH':
        return 'ACTIVE';
      case 'CLOSE':
        return 'CLOSED';
      case 'CANCEL':
        return 'CANCELLED';
      case 'REOPEN':
        return 'ACTIVE';
      default:
        return flight?.status;
    }
  }, [action, flight?.status]);

  const updateMutationConfig = useMemo(() => {
    switch (action) {
      case 'PUBLISH':
        return {
          fn: publishFlightFn,
          actionLabel: 'Mở bán',
        };
      case 'CLOSE':
        return {
          fn: closeFlightFn,
          actionLabel: 'Đóng bán',
        };
      case 'CANCEL':
        return {
          fn: cancelFlightFn,
          actionLabel: 'Hủy',
        };
      case 'REOPEN':
        return {
          fn: reopenFlightFn,
          actionLabel: 'Mở bán lại',
        };
      default:
        return null;
    }
  }, [action, cancelFlightFn, closeFlightFn, publishFlightFn, reopenFlightFn]);

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const onFinish = async (values: { remark: string }) => {
    if (!updateMutationConfig) {
      return;
    }
    try {
      setIsLoading(true);
      await updateMutationConfig.fn({
        id: flight.id,
        remark: values.remark,
      });
      toast.success(
        `${updateMutationConfig.actionLabel} chuyến bay ${flight?.bookingCode} thành công`
      );
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlaneIcon className="size-5 text-primary" />
            <span>{updateMutationConfig?.actionLabel} chuyến bay</span>
          </DialogTitle>
          <DialogDescription>
            {updateMutationConfig?.actionLabel} chuyến bay{' '}
            <span className="font-semibold text-primary">
              {flight?.bookingCode}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="dialog-scroll-content">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Thay đổi trạng thái">
              <div className="flex items-center gap-2">
                <Tag
                  className="px-2 py-0.5"
                  color={FLIGHT_STATUS_COLOR[flight.status]}
                  variant="outlined"
                >
                  {FLIGHT_STATUS_LABEL[flight.status]}
                </Tag>
                <span>→</span>
                <Tag
                  className="px-2 py-0.5"
                  color={FLIGHT_STATUS_COLOR[newStatus]}
                  variant="outlined"
                >
                  {FLIGHT_STATUS_LABEL[newStatus]}
                </Tag>
              </div>
            </Form.Item>
            <div>
              <Form.Item
                name="remark"
                label="Remark"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Remark không được để trống',
                  },
                ]}
              >
                <Input placeholder={'Remark'} />
              </Form.Item>
            </div>
          </Form>
        </div>
        <DialogFooter className="flex-row justify-between">
          <Button
            type="reset"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Đóng
          </Button>
          <Button
            type="submit"
            loading={isLoading}
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
