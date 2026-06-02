import { OBJECT_KEY_SEPARATOR } from '@/lib/constants';
import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  NAME: 'name',
  AIRLINE_CODE: 'airlineCode',
  FARE_RULES: 'rules',
  FARE_RULE_TYPE: ['rule', 'type'].join(OBJECT_KEY_SEPARATOR),
  FARE_RULE_TEXT: ['rule', 'text'].join(OBJECT_KEY_SEPARATOR),
} as const;

type TFormFields = (typeof FORM_FIELDS)[keyof typeof FORM_FIELDS];

export const FORM_LABELS: Partial<Record<TFormFields, string>> = {
  [FORM_FIELDS.NAME]: 'Tên bộ điều kiện vé',
  [FORM_FIELDS.AIRLINE_CODE]: 'Mã hãng hàng không',
  [FORM_FIELDS.FARE_RULES]: 'Cấu hình bộ điều kiện',
  [FORM_FIELDS.FARE_RULE_TYPE]: 'Loại ',
  [FORM_FIELDS.FARE_RULE_TEXT]: 'Nội dung',
} as const;

export const FORM_VALIDATIONS: Partial<Record<TFormFields, Rule[]>> = {
  [FORM_FIELDS.AIRLINE_CODE]: [
    { required: true, message: 'Hãy nhập mã hãng hàng không' },
    {
      pattern: Regex.AIRLINE_CODE,
      message: RegexValidationMessage.AIRLINE_CODE,
    },
  ],
  [FORM_FIELDS.NAME]: [
    {
      required: true,
      message: 'Hãy nhập tên bộ điều kiện vé',
      whitespace: true,
    },
  ],

  [FORM_FIELDS.FARE_RULES]: [
    {
      validator: (_, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(new Error('Vui lòng thêm ít nhất 1 điều kiện'));
        }
        return Promise.resolve();
      },
    },
  ],
  [FORM_FIELDS.FARE_RULE_TYPE]: [
    { required: true, message: 'Hãy chọn loại điều kiện' },
  ],
  [FORM_FIELDS.FARE_RULE_TEXT]: [
    { required: true, message: 'Hãy nhập nội dung điều kiện' },
  ],
} as const;
