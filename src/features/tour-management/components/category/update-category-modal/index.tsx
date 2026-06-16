import { AppDialog } from '@/components/app-ui/app-dialog';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/tour-management/components/category/update-category-modal/update-category-modal.schema';
import { updateCategory } from '@/features/tour-management/query';
import type { TCategoryListItem } from '@/features/tour-management/types';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { PenSquareIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type UpdateCategoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: TCategoryListItem;
};

export const UpdateCategoryModal = ({
  open,
  onOpenChange,
  category,
}: UpdateCategoryModalProps) => {
  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleUpdate = async (values: ObjectType) => {
    updateCategory(
      category.id,
      values[FORM_FIELDS.CODE] as string,
      values[FORM_FIELDS.NAME] as string
    );
    toast.success('Cập nhật tuyến tour thành công');
    handleOpenChange(false);
  };

  useEffect(() => {
    if (open && category) {
      form.setFieldsValue({
        [FORM_FIELDS.CODE]: category.code,
        [FORM_FIELDS.NAME]: category.name,
      });
    }
  }, [category, form, open]);

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      dialogContentClassName="sm:max-w-sm"
      title={
        <>
          <PenSquareIcon className="size-5 text-primary" />
          <span>Cập nhật tuyến tour</span>
        </>
      }
      description={
        <>
          Cập nhật thông tin cho tuyến{' '}
          <span className="font-semibold text-primary">{category?.name}</span>
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
          <Button type="submit" onClick={() => form.submit()}>
            Cập nhật
          </Button>
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
