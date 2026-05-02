import type { TLoginFormFields } from '@/features/auth/types';
import type { Rule } from 'antd/es/form';

export const USER_ROLE = {
  ADMIN: 'ADMIN',
  SALES: 'SALE',
  CUSTOMER_CARE: 'TICKETING',
  ACCOUNTING: 'ACCOUNTING',
  CONTENT_EDITOR: 'CONTENT',
} as const;

export const LOGIN_FORM_FIELDS = {
  USERNAME: 'userName',
  PASSWORD: 'password',
} as const;

export const LOGIN_FORM_LABELS: Partial<Record<TLoginFormFields, string>> = {
  [LOGIN_FORM_FIELDS.USERNAME]: 'Tên đăng nhập',
  [LOGIN_FORM_FIELDS.PASSWORD]: 'Mật khẩu',
} as const;

export const LOGIN_FORM_VALIDATIONS: Partial<Record<TLoginFormFields, Rule[]>> =
  {
    [LOGIN_FORM_FIELDS.USERNAME]: [{ required: true, whitespace: true }],
    [LOGIN_FORM_FIELDS.PASSWORD]: [{ required: true, whitespace: true }],
  } as const;
