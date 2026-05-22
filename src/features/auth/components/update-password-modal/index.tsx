import { useAppSelector } from '@/app/redux/hooks';
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
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/auth/components/update-password-modal/update-password-modal.schema';
import { useUpdateCurrentUserPasswordMutation } from '@/features/auth/query';
import { currentUserSelector } from '@/features/auth/selector';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { UserLockIcon } from 'lucide-react';
import { toast } from 'sonner';

type UpdatePasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UpdatePasswordModal = ({
  open,
  onOpenChange,
}: UpdatePasswordModalProps) => {
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserLockIcon className="size-5 text-primary" />
            <span>Cập nhật mật khẩu</span>
          </DialogTitle>
          <DialogDescription>
            Cập nhật mật khẩu của tài khoản{' '}
            <span className="font-semibold text-primary">
              {currentUser?.username}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="dialog-scroll-content">
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
