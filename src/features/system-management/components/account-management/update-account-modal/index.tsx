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
  USER_ACTIVE_STATUS_OPTIONS,
  USER_ROLES_OPTIONS,
} from '@/features/auth/constants';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/system-management/components/account-management/update-account-modal/update-account-modal.schema';
import { useUpdateAccountMutation } from '@/features/system-management/query';
import type {
  TAccountListItem,
  TUpdateAccountParams,
} from '@/features/system-management/types';
import type { ObjectType } from '@/lib/types';
import { Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import { toast } from 'sonner';

type UpdateAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: TAccountListItem;
};

export const UpdateAccountModal = ({
  open,
  onOpenChange,
  account,
}: UpdateAccountModalProps) => {
  const [updateAccountFn, { isLoading }] = useUpdateAccountMutation();

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
      await updateAccountFn({
        id: account.id,
        data: values as TUpdateAccountParams,
      }).unwrap();
      toast.success('Cập nhật thông tin tài khoản thành công');
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open && account) {
      form.setFieldsValue({
        [FORM_FIELDS.DISPLAY_NAME]: account.displayName,
        [FORM_FIELDS.EMAIL]: account.email,
        [FORM_FIELDS.PHONE]: account.phone,
        [FORM_FIELDS.ROLE]: account.role,
        [FORM_FIELDS.IS_ACTIVE]: account.isActive,
      });
    }
  }, [account, form, open]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Cập nhật tài khoản</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cho tài khoản{' '}
              <span className="font-semibold">{account?.displayName}</span>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form.Item
              name={FORM_FIELDS.DISPLAY_NAME}
              label={FORM_LABELS[FORM_FIELDS.DISPLAY_NAME]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.DISPLAY_NAME]}
            >
              <Input placeholder={FORM_LABELS[FORM_FIELDS.DISPLAY_NAME]} />
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
              name={FORM_FIELDS.ROLE}
              label={FORM_LABELS[FORM_FIELDS.ROLE]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.ROLE]}
            >
              <Select
                placeholder={FORM_LABELS[FORM_FIELDS.ROLE]}
                options={USER_ROLES_OPTIONS}
              />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.IS_ACTIVE}
              label={FORM_LABELS[FORM_FIELDS.IS_ACTIVE]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.IS_ACTIVE]}
            >
              <Select
                placeholder={FORM_LABELS[FORM_FIELDS.IS_ACTIVE]}
                options={USER_ACTIVE_STATUS_OPTIONS}
              />
            </Form.Item>
          </div>
          <DialogFooter className="justify-between!">
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
      </Form>
    </Dialog>
  );
};
