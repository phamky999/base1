import { Button } from '@/components/ui/button';
import {
  FORM_FIELDS,
  FORM_LABELS,
  FORM_VALIDATIONS,
} from '@/features/auth/components/login-form/login-form.schema';
import { useSignInUserMutation } from '@/features/auth/query';
import type { TUserSignInPayload } from '@/features/auth/types';
import { TOKEN } from '@/lib/constants';
import { setAuthToken } from '@/lib/utils';
import { Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const [userLoginMutationFn, { isLoading }] = useSignInUserMutation();

  const handleLogin = async (payload: TUserSignInPayload) => {
    try {
      const response = await userLoginMutationFn(payload).unwrap();
      const {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
        user,
      } = response?.data || {};
      setAuthToken(TOKEN.ACCESS_TOKEN, accessToken, accessTokenExpiresIn);
      setAuthToken(TOKEN.REFRESH_TOKEN, refreshToken, refreshTokenExpiresIn);

      if (!user?.isActive) {
        void toast.error('Tài khoản chưa được kích hoạt');
        return;
      }

      void toast.success('Đăng nhập thành công');

      const redirectTo =
        (location.state as { redirectTo?: string } | null)?.redirectTo ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleLogin}>
      <Form.Item
        name={FORM_FIELDS.PROVIDER_CODE}
        label={FORM_LABELS[FORM_FIELDS.PROVIDER_CODE]}
        rules={FORM_VALIDATIONS[FORM_FIELDS.PROVIDER_CODE]}
      >
        <Input
          placeholder={FORM_LABELS[FORM_FIELDS.PROVIDER_CODE]}
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
