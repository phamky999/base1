import { AppDialog } from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/system-management/components/account-management/update-account-password-modal/update-account-password-modal.schema';
import { useUpdateAccountPasswordMutation } from '@/features/system-management/query';
import type { TAccountListItem } from '@/features/system-management/types';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { UserLockIcon } from 'lucide-react';
import { toast } from 'sonner';

type UpdateAccountPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: TAccountListItem;
};

export const UpdateAccountPasswordModal = ({
  open,
  onOpenChange,
  account,
}: UpdateAccountPasswordModalProps) => {
  const [updateAccountPasswordFn, { isLoading }] =
    useUpdateAccountPasswordMutation();

  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleUpdateProfile = async (values: ObjectType) => {
    try {
      if (!account?.id) {
        toast.error('Không tìm thấy thông tin tài khoản');
        return;
      }
      await updateAccountPasswordFn({
        id: account.id,
        data: {
          newPassword: values[FORM_FIELDS.NEW_PASSWORD],
        },
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
          Cập nhật mật khẩu cho tài khoản{' '}
          <span className="font-semibold text-primary">
            {account?.displayName}
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
        <Form.Item
          name={FORM_FIELDS.NEW_PASSWORD}
          label={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]}
          rules={FORM_VALIDATIONS[FORM_FIELDS.NEW_PASSWORD]}
        >
          <Input.Password placeholder={FORM_LABELS[FORM_FIELDS.NEW_PASSWORD]} />
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
      </Form>
    </AppDialog>
  );
};
