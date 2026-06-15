import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  DISPLAY_NAME: 'displayName',
  ROLE: 'role',
  EMAIL: 'email',
  PHONE: 'phone',
  IS_ACTIVE: 'isActive',
  PERMISSIONS: 'permissions',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.DISPLAY_NAME]: 'Tên hiển thị',
  [FORM_FIELDS.ROLE]: 'Vai trò',
  [FORM_FIELDS.EMAIL]: 'Email',
  [FORM_FIELDS.PHONE]: 'Số điện thoại',
  [FORM_FIELDS.IS_ACTIVE]: 'Trạng thái',
  [FORM_FIELDS.PERMISSIONS]: 'Quyền hạn',
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
  [FORM_FIELDS.IS_ACTIVE]: [
    { required: true, message: 'Vui lòng chọn trạng thái' },
  ],
  [FORM_FIELDS.PERMISSIONS]: [
    { required: true, message: 'Vui lòng chọn quyền hạn' },
  ],
} as const;
