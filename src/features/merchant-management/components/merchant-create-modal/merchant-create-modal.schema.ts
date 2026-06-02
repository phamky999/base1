import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  MERCHANT_CODE: 'merchantCode',
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  IS_ACTIVE: 'isActive',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Record<TFormFields, string> = {
  [FORM_FIELDS.MERCHANT_CODE]: 'Mã kênh bán',
  [FORM_FIELDS.NAME]: 'Tên kênh bán',
  [FORM_FIELDS.EMAIL]: 'Email',
  [FORM_FIELDS.PHONE]: 'Số điện thoại',
  [FORM_FIELDS.IS_ACTIVE]: 'Trạng thái',
} as const;

export const FORM_VALIDATIONS: Record<TFormFields, Rule[]> = {
  [FORM_FIELDS.MERCHANT_CODE]: [
    { required: true, message: 'Vui lòng nhập mã kênh bán', whitespace: true },
    {
      pattern: Regex.MERCHANT_CODE,
      message: RegexValidationMessage.MERCHANT_CODE,
    },
  ],
  [FORM_FIELDS.NAME]: [
    { required: true, message: 'Vui lòng nhập tên kênh bán', whitespace: true },
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
  [FORM_FIELDS.IS_ACTIVE]: [
    { required: true, message: 'Vui lòng chọn trạng thái' },
  ],
} as const;
