import { useAppSelector } from '@/app/redux/hooks';
import { AppDialog } from '@/components/app-ui/app-dialog';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/auth/components/password-update-modal/password-update-modal.schema';
import { useUpdateCurrentUserPasswordMutation } from '@/features/auth/query';
import { currentUserSelector } from '@/features/auth/selector';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { UserLockIcon } from 'lucide-react';
import { toast } from 'sonner';

type PasswordModalUpdateProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const PasswordUpdateModal = ({
  open,
  onOpenChange,
}: PasswordModalUpdateProps) => {
  const [updateCurrentUserPasswordFn, { isLoading }] =
    useUpdateCurrentUserPasswordMutation();

  const currentUser = useAppSelector(currentUserSelector);

  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleUpdateProfile = async (values: ObjectType) => {
    try {
      await updateCurrentUserPasswordFn({
        currentPassword: values[FORM_FIELDS.CURRENT_PASSWORD],
        newPassword: values[FORM_FIELDS.NEW_PASSWORD],
      }).unwrap();
      toast.success('Cập nhật mật khẩu thành công');
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      dialogContentClassName="sm:max-w-sm"
      title={
        <>
          <UserLockIcon className="size-5 text-primary" />
          <span>Cập nhật mật khẩu</span>
        </>
      }
      description={
        <>
          Cập nhật mật khẩu của tài khoản{' '}
          <span className="font-semibold text-primary">
            {currentUser?.username}
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
      <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
        <div>
          <Form.Item
            name={FORM_FIELDS.CURRENT_PASSWORD}
            label={FORM_LABELS[FORM_FIELDS.CURRENT_PASSWORD]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.CURRENT_PASSWORD]}
          >
            <Input.Password
              placeholder={FORM_LABELS[FORM_FIELDS.CURRENT_PASSWORD]}
            />
          </Form.Item>
          <Form.Item
            name={FORM_FIELDS.NEW_PASSWORD}
            label={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.NEW_PASSWORD]}
          >
            <Input.Password
              placeholder={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]}
            />
          </Form.Item>
          <Form.Item
            name={FORM_FIELDS.CONFIRM_PASSWORD}
            label={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.CONFIRM_PASSWORD]}
          >
            <Input.Password
              placeholder={FORM_LABELS[FORM_FIELDS.CONFIRM_PASSWORD]}
            />
          </Form.Item>
        </div>
      </Form>
    </AppDialog>
  );
};
