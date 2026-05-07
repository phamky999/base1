import { getPagePath } from '@/app/router/app-router-paths';
import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/auth/components/login-form.schema';
import { useSignInUserMutation } from '@/features/auth/query';
import type { TUserSignInPayload } from '@/features/auth/types';
import { TOKEN } from '@/lib/constants';
import { setAuthToken } from '@/lib/utils';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [userLoginMutationFn, { isLoading }] = useSignInUserMutation();

  const handleLogin = async (payload: TUserSignInPayload) => {
    try {
      const response = await userLoginMutationFn(payload).unwrap();
      const {
        accessToken,
        refreshToken,
        expireInSeconds,
        refreshTokenExpireIn,
      } = response?.data || {};
      setAuthToken(TOKEN.ACCESS_TOKEN, accessToken, expireInSeconds);
      setAuthToken(TOKEN.REFRESH_TOKEN, refreshToken, refreshTokenExpireIn);

      void toast.success('Đăng nhập thành công');
      navigate(getPagePath('portalPage'));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleLogin}>
      <Form.Item
        name={FORM_FIELDS.PARTNER_CODE}
        label={FORM_LABELS[FORM_FIELDS.PARTNER_CODE]}
        rules={FORM_VALIDATIONS[FORM_FIELDS.PARTNER_CODE]}
      >
        <Input
          placeholder={FORM_LABELS[FORM_FIELDS.PARTNER_CODE]}
          className="h-10"
        />
      </Form.Item>

      <Form.Item
        name={FORM_FIELDS.USERNAME}
        label={FORM_LABELS[FORM_FIELDS.USERNAME]}
        rules={FORM_VALIDATIONS[FORM_FIELDS.USERNAME]}
      >
        <Input
          placeholder={FORM_LABELS[FORM_FIELDS.USERNAME]}
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

      <Form.Item>
        <Button
          variant={'default'}
          loading={isLoading}
          type="submit"
          className="h-10 w-full"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
