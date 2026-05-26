import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateMerchantMutation } from '@/features/merchant-management/query';
import type { TCreateMerchantParams } from '@/features/merchant-management/types';
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
} from './create-merchant-modal.schema';

type CreateMerchantModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateMerchantModal = ({
  open,
  onOpenChange,
}: CreateMerchantModalProps) => {
  const [createMerchantFn, { isLoading }] = useCreateMerchantMutation();
  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleCreateMerchant = async (values: ObjectType) => {
    try {
      await createMerchantFn(values as TCreateMerchantParams).unwrap();
      toast.success('Tạo kênh bán thành công');
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        [FORM_FIELDS.IS_ACTIVE]: true,
      });
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenSquareIcon className="size-5 text-primary" />
            <span>Tạo kênh bán mới</span>
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin để thêm kênh bán mới
          </DialogDescription>
        </DialogHeader>

        <div className="dialog-scroll-content max-h-[60vh]!">
          <Form form={form} layout="vertical" onFinish={handleCreateMerchant}>
            <Form.Item
              name={FORM_FIELDS.MERCHANT_CODE}
              label={FORM_LABELS[FORM_FIELDS.MERCHANT_CODE]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.MERCHANT_CODE]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.MERCHANT_CODE]} />
            </Form.Item>

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
            Tạo mới
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
