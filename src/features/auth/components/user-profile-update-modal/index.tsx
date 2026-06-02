import { useAppSelector } from '@/app/redux/hooks';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
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
} from '@/features/auth/components/user-profile-update-modal/user-profile-update-modal.schema';
import { useUpdateCurrentUserProfileMutation } from '@/features/auth/query';
import { currentUserSelector } from '@/features/auth/selector';
import type { ObjectType } from '@/lib/types';
import { Form, Input } from 'antd';
import { User2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type UserProfileUpdateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UserProfileUpdateModal = ({
  open,
  onOpenChange,
}: UserProfileUpdateModalProps) => {
  const currentUser = useAppSelector(currentUserSelector);

  const [updateCurrentUserProfileFn, { isLoading }] =
    useUpdateCurrentUserProfileMutation();

  const [form] = Form.useForm();

  const handleUpdateProfile = async (values: ObjectType) => {
    try {
      await updateCurrentUserProfileFn(values).unwrap();
      toast.success('Cập nhật thông tin cá nhân thành công');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        displayName: currentUser?.displayName,
        email: currentUser?.email,
        phone: currentUser?.phone,
      });
    }
  }, [open, form, currentUser]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User2Icon className="size-5 text-primary" />
            <span>Cập nhật thông tin cá nhân</span>
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân của tài khoản{' '}
            <span className="font-semibold text-primary">
              {currentUser?.username}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="dialog-scroll-content">
          <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
            <Form.Item
              name={FORM_FIELDS.DISPLAYNAME}
              label={FORM_LABELS[FORM_FIELDS.DISPLAYNAME]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.DISPLAYNAME]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.DISPLAYNAME]} />
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
          </Form>
        </div>
        <DialogFooter className="flex-row justify-between">
          <DialogClose asChild>
            <Button type="reset" variant="outline">
              Đóng
            </Button>
          </DialogClose>
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
