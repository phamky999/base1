import { getPagePath } from '@/app/router/app-router-paths';
import {
  LOGIN_FORM_FIELDS,
  LOGIN_FORM_LABELS,
  LOGIN_FORM_VALIDATIONS,
} from '@/features/auth/constants';
import { useSignInUserMutation } from '@/features/auth/query';
import type { TUserSignInPayload } from '@/features/auth/types';
import { TOKEN } from '@/lib/constants';
import { setAuthToken } from '@/lib/utils';
import { Button, Form, Input } from 'antd';
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
        name={LOGIN_FORM_FIELDS.USERNAME}
        label={LOGIN_FORM_LABELS[LOGIN_FORM_FIELDS.USERNAME]}
        rules={LOGIN_FORM_VALIDATIONS[LOGIN_FORM_FIELDS.USERNAME]}
      >
        <Input
          placeholder={LOGIN_FORM_LABELS[LOGIN_FORM_FIELDS.USERNAME]}
          className="h-10"
        />
      </Form.Item>

      <Form.Item
        name={LOGIN_FORM_FIELDS.PASSWORD}
        label={LOGIN_FORM_LABELS[LOGIN_FORM_FIELDS.PASSWORD]}
        rules={LOGIN_FORM_VALIDATIONS[LOGIN_FORM_FIELDS.PASSWORD]}
      >
        <Input.Password
          placeholder={LOGIN_FORM_LABELS[LOGIN_FORM_FIELDS.PASSWORD]}
          className="h-10"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          loading={isLoading}
          htmlType="submit"
          className="h-10 w-full"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};
