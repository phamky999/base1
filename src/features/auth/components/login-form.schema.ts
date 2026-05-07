import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  PARTNER_CODE: 'partnerCode',
  USERNAME: 'userName',
  PASSWORD: 'password',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.PARTNER_CODE]: 'Mã đối tác',
  [FORM_FIELDS.USERNAME]: 'Tên đăng nhập',
  [FORM_FIELDS.PASSWORD]: 'Mật khẩu',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.PARTNER_CODE]: [{ required: true, whitespace: true }],
  [FORM_FIELDS.USERNAME]: [{ required: true, whitespace: true }],
  [FORM_FIELDS.PASSWORD]: [{ required: true, whitespace: true }],
} as const;
