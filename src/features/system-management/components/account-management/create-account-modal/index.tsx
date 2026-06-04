import { useAppSelector } from '@/app/redux/hooks';
import { AppDialog } from '@/components/app-dialog';
import { Button } from '@/components/ui/button';
import {
  USER_PERMISSIONS_OPTIONS,
  USER_ROLES_OPTIONS,
} from '@/features/auth/constants';
import { currentUserSelector } from '@/features/auth/selector';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/system-management/components/account-management/create-account-modal/create-account-modal.schema';
import { useCreateAccountMutation } from '@/features/system-management/query';
import type { TCreateAccountParams } from '@/features/system-management/types';
import type { ObjectType } from '@/lib/types';
import { Form, Input, Select } from 'antd';
import { SquareUserIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

type CreateAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateAccountModal = ({
  open,
  onOpenChange,
}: CreateAccountModalProps) => {
  const currentUser = useAppSelector(currentUserSelector);

  const [createAccountFn, { isLoading }] = useCreateAccountMutation();

  const [form] = Form.useForm();

  const handleOpenChange = (o: boolean) => {
    if (!o) {
      form.resetFields();
    }
    onOpenChange(o);
  };

  const handleUpdateProfile = async (values: ObjectType) => {
    try {
      await createAccountFn(values as TCreateAccountParams).unwrap();
      toast.success('Tạo tài khoản thành công');
      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (open && currentUser) {
      form.setFieldsValue({
        [FORM_FIELDS.PROVIDER_CODE]: currentUser.providerCode,
        [FORM_FIELDS.ROLE]: USER_ROLES_OPTIONS[0].value,
        [FORM_FIELDS.PERMISSIONS]: USER_PERMISSIONS_OPTIONS[0].value,
      });
    }
  }, [open, currentUser, form]);

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={
        <>
          <SquareUserIcon className="size-5 text-primary" />
          <span>Tạo tài khoản mới</span>
        </>
      }
      description="Nhập thông tin để tạo tài khoản mới"
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
            Tạo mới
          </Button>
        </>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleUpdateProfile}>
        <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
          <Form.Item
            name={FORM_FIELDS.PROVIDER_CODE}
            label={FORM_LABELS[FORM_FIELDS.PROVIDER_CODE]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PROVIDER_CODE]}
          >
            <Input
              placeholder={FORM_LABELS[FORM_FIELDS.PROVIDER_CODE]}
              disabled
            />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.DISPLAY_NAME}
            label={FORM_LABELS[FORM_FIELDS.DISPLAY_NAME]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.DISPLAY_NAME]}
          >
            <Input placeholder={FORM_LABELS[FORM_FIELDS.DISPLAY_NAME]} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.USERNAME}
            label={FORM_LABELS[FORM_FIELDS.USERNAME]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.USERNAME]}
          >
            <Input placeholder={FORM_LABELS[FORM_FIELDS.USERNAME]} />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.PASSWORD}
            label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PASSWORD]}
          >
            <Input.Password placeholder={FORM_LABELS[FORM_FIELDS.PASSWORD]} />
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
              classNames={{
                popup: {
                  root: 'pointer-events-auto',
                },
              }}
              placeholder={FORM_LABELS[FORM_FIELDS.ROLE]}
              options={USER_ROLES_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            name={FORM_FIELDS.PERMISSIONS}
            label={FORM_LABELS[FORM_FIELDS.PERMISSIONS]}
            rules={FORM_VALIDATIONS[FORM_FIELDS.PERMISSIONS]}
          >
            <Select
              mode="multiple"
              classNames={{
                popup: {
                  root: 'pointer-events-auto',
                },
              }}
              placeholder={FORM_LABELS[FORM_FIELDS.PERMISSIONS]}
              options={USER_PERMISSIONS_OPTIONS}
            />
          </Form.Item>
        </div>
      </Form>
    </AppDialog>
  );
};
