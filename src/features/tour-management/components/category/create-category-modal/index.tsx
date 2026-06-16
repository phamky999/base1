import { AppDialog } from '@/components/app-ui/app-dialog';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/tour-management/components/category/create-category-modal/create-category-modal.schema';
import { addCategory } from '@/features/tour-management/query';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { RouteIcon } from 'lucide-react';
import { toast } from 'sonner';

type CreateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateCategoryModal = ({
  open,
  onOpenChange,
}: CreateCategoryModalProps) => {
  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleCreate = async (values: ObjectType) => {
    addCategory(
      values[FORM_FIELDS.CODE] as string,
      values[FORM_FIELDS.NAME] as string
    );
    toast.success('Thêm tuyến tour thành công');
    handleOpenChange(false);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={
        <>
          <RouteIcon className="size-5 text-primary" />
          <span>Thêm tuyến tour mới</span>
        </>
      }
      description="Nhập thông tin để thêm tuyến tour mới"
      footer={
        <>
          <Button
            type="reset"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Đóng
          </Button>
          <Button type="submit" onClick={() => form.submit()}>
            Thêm mới
          </Button>
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item
          name={FORM_FIELDS.CODE}
          label={FORM_LABELS[FORM_FIELDS.CODE]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.CODE]}
        >
          <Input placeholder={FORM_LABELS[FORM_FIELDS.CODE]} />
        </Form.Item>

        <Form.Item
          name={FORM_FIELDS.NAME}
          label={FORM_LABELS[FORM_FIELDS.NAME]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.NAME]}
        >
          <Input placeholder={FORM_LABELS[FORM_FIELDS.NAME]} />
        </Form.Item>
      </Form>
    </AppDialog>
  );
};
