import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  NEW_PASSWORD: 'newPassword',
  CONFIRM_PASSWORD: 'confirmPassword',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.NEW_PASSWORD]: 'Mật khẩu mới',
  [FORM_FIELDS.CONFIRM_PASSWORD]: 'Xác nhận mật khẩu',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.NEW_PASSWORD]: [
    {
      required: true,
      message: 'Vui lòng nhập mật khẩu mới',
      whitespace: true,
    },
    {
      min: 8,
      message: 'Mật khẩu phải có ít nhất 8 ký tự',
    },
  ],

  [FORM_FIELDS.CONFIRM_PASSWORD]: [
    {
      required: true,
      message: 'Vui lòng xác nhận mật khẩu',
      whitespace: true,
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (
          !value ||
          value.trim() === getFieldValue(FORM_FIELDS.NEW_PASSWORD)?.trim()
        ) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Mật khẩu không khớp'));
      },
    }),
  ],
} as const;
