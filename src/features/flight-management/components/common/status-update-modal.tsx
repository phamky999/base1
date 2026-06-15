import { AppDialog } from '@/components/app-ui/app-dialog';
import { Button } from '@/components/ui/button';
import { Form, Input, Tag } from 'antd';
import { PlaneIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

type StatusUpdateModalProps<TStatus extends string, TAction extends string> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: TAction;
  entity: {
    id: string;
    status: TStatus;
    transactionCode: string;
  };
  actionToStatus: Partial<Record<TAction, TStatus>>;
  mutationConfig: Partial<
    Record<
      TAction,
      {
        mutationFn: (args: { id: string; remark: string }) => Promise<unknown>;
        actionLabel: string;
      }
    >
  >;
  statusLabel: Record<TStatus, string>;
  statusColor: Record<TStatus, string>;
  entityLabel: string;
  icon?: React.ReactNode;
};

export const StatusUpdateModal = <
  TStatus extends string,
  TAction extends string,
>({
  open,
  onOpenChange,
  action,
  entity,
  actionToStatus,
  mutationConfig,
  statusLabel,
  statusColor,
  entityLabel,
  icon = <PlaneIcon className="size-5 text-primary" />,
}: StatusUpdateModalProps<TStatus, TAction>) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const newStatus = useMemo(
    () => actionToStatus[action] ?? entity.status,
    [action, actionToStatus, entity.status]
  );

  const config = useMemo(
    () => mutationConfig[action],
    [action, mutationConfig]
  );

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const onFinish = async (values: { remark: string }) => {
    if (!config) return;
    try {
      setIsLoading(true);
      await config.mutationFn({ id: entity.id, remark: values.remark });
      toast.success(
        `${config.actionLabel} ${entityLabel} ${entity.transactionCode} thành công`
      );
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      dialogContentClassName="sm:max-w-sm"
      title={
        <>
          {icon}
          <span>
            {config?.actionLabel} {entityLabel}
          </span>
        </>
      }
      description={
        <>
          {config?.actionLabel} {entityLabel}{' '}
          <span className="font-semibold text-primary">
            {entity.transactionCode}
          </span>
        </>
      }
      footer={
        <>
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
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Thay đổi trạng thái">
          <div className="flex items-center gap-2">
            <Tag
              className="px-2 py-0.5"
              color={statusColor[entity.status]}
              variant="outlined"
            >
              {statusLabel[entity.status]}
            </Tag>
            <span>→</span>
            {newStatus && (
              <Tag
                className="px-2 py-0.5"
                color={statusColor[newStatus]}
                variant="outlined"
              >
                {statusLabel[newStatus]}
              </Tag>
            )}
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
            <Input placeholder="Remark" />
          </Form.Item>
        </div>
      </Form>
    </AppDialog>
  );
};
