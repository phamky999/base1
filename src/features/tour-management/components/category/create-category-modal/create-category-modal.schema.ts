import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  CODE: 'code',
  NAME: 'name',
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.CODE]: 'Mã tuyến',
  [FORM_FIELDS.NAME]: 'Tên tuyến',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.CODE]: [
    {
      required: true,
      message: 'Vui lòng nhập mã tuyến',
      whitespace: true,
    },
  ],
  [FORM_FIELDS.NAME]: [
    {
      required: true,
      message: 'Vui lòng nhập tên tuyến',
      whitespace: true,
    },
  ],
} as const;
