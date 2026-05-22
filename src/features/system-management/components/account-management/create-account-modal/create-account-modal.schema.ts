import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  USERNAME: 'username',
  DISPLAY_NAME: 'displayName',
  PROVIDER_CODE: 'providerCode',
  PASSWORD: 'password',
  ROLE: 'role',
  EMAIL: 'email',
  PHONE: 'phone',
  PERMISSIONS: 'permissions',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.DISPLAY_NAME]: 'Tên hiển thị',
  [FORM_FIELDS.ROLE]: 'Vai trò',
  [FORM_FIELDS.EMAIL]: 'Email',
  [FORM_FIELDS.PHONE]: 'Số điện thoại',
  [FORM_FIELDS.PASSWORD]: 'Mật khẩu',
  [FORM_FIELDS.USERNAME]: 'Tên đăng nhập',
  [FORM_FIELDS.PROVIDER_CODE]: 'Mã nhà cung cấp',
  [FORM_FIELDS.PERMISSIONS]: 'Phân quyền',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.DISPLAY_NAME]: [
    { required: true, message: 'Vui lòng nhập tên hiển thị', whitespace: true },
  ],
  [FORM_FIELDS.EMAIL]: [
    { required: true, message: 'Vui lòng nhập email' },
    { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
  ],
  [FORM_FIELDS.PHONE]: [
    { required: true, message: 'Vui lòng nhập số điện thoại' },
    {
      pattern: Regex.PHONE_NUMBER,
      message: RegexValidationMessage.PHONE_NUMBER,
    },
  ],
  [FORM_FIELDS.ROLE]: [{ required: true, message: 'Vui lòng chọn vai trò' }],
  [FORM_FIELDS.USERNAME]: [
    {
      required: true,
      message: 'Vui lòng nhập tên đăng nhập',
      whitespace: true,
    },
  ],
  [FORM_FIELDS.PROVIDER_CODE]: [
    {
      required: true,
      message: 'Vui lòng nhập mã nhà cung cấp',
      whitespace: true,
    },
  ],
  [FORM_FIELDS.PERMISSIONS]: [
    { required: true, message: 'Vui lòng chọn phân quyền' },
  ],
  [FORM_FIELDS.PASSWORD]: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu',
      whitespace: true,
    },
    {
      min: 8,
      message: 'Mật khẩu phải có ít nhất 8 ký tự',
    },
  ],
} as const;
