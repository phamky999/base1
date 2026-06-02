import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  DISPLAYNAME: 'displayName',
  EMAIL: 'email',
  PHONE: 'phone',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.DISPLAYNAME]: 'Tên hiển thị',
  [FORM_FIELDS.EMAIL]: 'Email',
  [FORM_FIELDS.PHONE]: 'Số điện thoại',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.DISPLAYNAME]: [
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
} as const;
