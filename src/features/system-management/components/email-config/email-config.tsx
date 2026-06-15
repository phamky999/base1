import { Button } from '@/components/ui/button';
import {
  useGetEmailConfigQuery,
  useUpdateEmailConfigMutation,
} from '@/features/system-management/query';
import type { TUpdateEmailConfigParams } from '@/features/system-management/types';
import { Form, Input, InputNumber, Skeleton, Switch } from 'antd';
import { SaveIcon } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from './email-config.schema';

export const EmailConfig = () => {
  const [form] = Form.useForm<TUpdateEmailConfigParams>();

  const { data: queryResponse, isLoading: isFetching } =
    useGetEmailConfigQuery();
  const emailConfig = queryResponse?.data;

  const [updateEmailConfig, { isLoading: isUpdating }] =
    useUpdateEmailConfigMutation();

  useEffect(() => {
    if (emailConfig) {
      form.setFieldsValue({
        [FORM_FIELDS.EMAIL]: emailConfig.email,
        [FORM_FIELDS.PASSWORD]: emailConfig.password,
        [FORM_FIELDS.HOST]: emailConfig.host,
        [FORM_FIELDS.PORT]: emailConfig.port,
        [FORM_FIELDS.SENDER_NAME]: emailConfig.senderName,
        [FORM_FIELDS.CC_EMAIL]: emailConfig.ccEmail,
        [FORM_FIELDS.ENABLE_SSL]: emailConfig.enableSSL,
      });
    }
  }, [emailConfig, form]);

  const handleSubmit = async (values: TUpdateEmailConfigParams) => {
    try {
      await updateEmailConfig(values).unwrap();
      toast.success('Cập nhật cấu hình email thành công');
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi cập nhật cấu hình');
    }
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-xs">
      <div className="mb-4">
        <h2 className="text-lg leading-none font-semibold tracking-tight">
          Cấu hình Email
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cập nhật thông tin email hệ thống.
        </p>
      </div>

      <Skeleton loading={isFetching} active>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-x-4 md:grid-cols-2">
            <Form.Item
              name={FORM_FIELDS.EMAIL}
              label={FORM_LABELS[FORM_FIELDS.EMAIL]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.EMAIL]}
            >
              <Input
                placeholder={FORM_LABELS[FORM_FIELDS.EMAIL]}
                className="h-10"
              />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.PASSWORD}
              label={FORM_LABELS[FORM_FIELDS.PASSWORD]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.PASSWORD]}
            >
              <Input.Password
                placeholder={FORM_LABELS[FORM_FIELDS.PASSWORD]}
                className="h-10"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name={FORM_FIELDS.HOST}
              label={FORM_LABELS[FORM_FIELDS.HOST]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.HOST]}
            >
              <Input
                placeholder={FORM_LABELS[FORM_FIELDS.HOST]}
                className="h-10"
              />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.PORT}
              label={FORM_LABELS[FORM_FIELDS.PORT]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.PORT]}
            >
              <InputNumber
                placeholder={FORM_LABELS[FORM_FIELDS.PORT]}
                className="h-10 w-full"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name={FORM_FIELDS.SENDER_NAME}
              label={FORM_LABELS[FORM_FIELDS.SENDER_NAME]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.SENDER_NAME]}
            >
              <Input
                placeholder={FORM_LABELS[FORM_FIELDS.SENDER_NAME]}
                className="h-10"
              />
            </Form.Item>

            <Form.Item
              name={FORM_FIELDS.CC_EMAIL}
              label={FORM_LABELS[FORM_FIELDS.CC_EMAIL]}
              rules={FORM_VALIDATIONS[FORM_FIELDS.CC_EMAIL]}
            >
              <Input
                placeholder={FORM_LABELS[FORM_FIELDS.CC_EMAIL]}
                className="h-10"
              />
            </Form.Item>
          </div>

          <Form.Item
            name={FORM_FIELDS.ENABLE_SSL}
            label={FORM_LABELS[FORM_FIELDS.ENABLE_SSL]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <div className="flex justify-end pt-4">
            <Button type="submit" className="gap-2" loading={isUpdating}>
              <SaveIcon className="mr-2 size-4" />
              Lưu cấu hình
            </Button>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};
