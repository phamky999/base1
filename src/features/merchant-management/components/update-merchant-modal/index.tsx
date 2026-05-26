import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateMerchantMutation } from '@/features/merchant-management/query';
import type {
  TMerchantListItem,
  TUpdateMerchantParams,
} from '@/features/merchant-management/types';
import { ACTIVE_STATUS_OPTIONS } from '@/lib/constants';
import type { ObjectType } from '@/lib/types';
import { Form, Input, Select } from 'antd';
import { PenSquareIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from './update-merchant-modal.schema';

type UpdateMerchantModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchant: TMerchantListItem;
};

export const UpdateMerchantModal = ({
  open,
  onOpenChange,
  merchant,
}: UpdateMerchantModalProps) => {
  const [updateMerchantFn, { isLoading }] = useUpdateMerchantMutation();
  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleUpdateMerchant = async (values: ObjectType) => {
    try {
      if (!merchant?.id) {
        toast.error('Không tìm thấy thông tin kênh bán');
        return;
      }
      await updateMerchantFn({
        id: merchant.id,
        ...(values as Omit<TUpdateMerchantParams, 'id'>),
      }).unwrap();
      toast.success('Cập nhật kênh bán thành công');
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open && merchant) {
      form.setFieldsValue({
        [FORM_FIELDS.NAME]: merchant.name,
        [FORM_FIELDS.EMAIL]: merchant.email,
        [FORM_FIELDS.PHONE]: merchant.phone,
        [FORM_FIELDS.IS_ACTIVE]: merchant.isActive,
      });
    }
  }, [open, merchant, form]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenSquareIcon className="size-5 text-primary" />
            <span>Cập nhật kênh bán</span>
          </DialogTitle>

          <DialogDescription>
            Cập nhật thông tin cho kênh bán{' '}
            <span className="font-semibold text-primary">{merchant?.name}</span>
          </DialogDescription>
        </DialogHeader>
        <div className="dialog-scroll-content">
          <Form form={form} layout="vertical" onFinish={handleUpdateMerchant}>
            <Form.Item
              name={FORM_FIELDS.NAME}
              label={FORM_LABELS[FORM_FIELDS.NAME]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.NAME]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.NAME]} />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.EMAIL}
              label={FORM_LABELS[FORM_FIELDS.EMAIL]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.EMAIL]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.EMAIL]} />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.PHONE}
              label={FORM_LABELS[FORM_FIELDS.PHONE]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.PHONE]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.PHONE]} />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.IS_ACTIVE}
              label={FORM_LABELS[FORM_FIELDS.IS_ACTIVE]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.IS_ACTIVE]}
            >
              <Select
                classNames={{
                  popup: {
                    root: 'pointer-events-auto',
                  },
                }}
                placeholder={FORM_LABELS[FORM_FIELDS.IS_ACTIVE]}
                options={ACTIVE_STATUS_OPTIONS}
              />
            </Form.Item>
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
