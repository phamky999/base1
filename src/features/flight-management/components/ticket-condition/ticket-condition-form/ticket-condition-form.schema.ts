import { Regex, RegexValidationMessage } from '@/lib/validations';
import type { Rule } from 'antd/es/form';

export const FORM_FIELDS = {
  NAME: 'name',
  AIRLINE_CODE: 'airlineCode',
  RULES: 'rules',
} as const;

export const RULE_FIELDS = {
  TYPE: 'type',
  TEXT: 'text',
} as const;

export const FORM_LABELS = {
  [FORM_FIELDS.NAME]: 'Tên bộ điều kiện vé',
  [FORM_FIELDS.AIRLINE_CODE]: 'Mã hãng hàng không',
  [FORM_FIELDS.RULES]: 'Cấu hình bộ điều kiện',
  [RULE_FIELDS.TYPE]: 'Loại',
  [RULE_FIELDS.TEXT]: 'Nội dung',
} as const;

export const FORM_VALIDATIONS: Partial<Record<string, Rule[]>> = {
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

  [FORM_FIELDS.RULES]: [
    {
      validator: (_, value) => {
        if (!value || value.length === 0) {
          return Promise.reject(new Error('Vui lòng thêm ít nhất 1 điều kiện'));
        }
        return Promise.resolve();
      },
    },
  ],
  [RULE_FIELDS.TYPE]: [{ required: true, message: 'Hãy chọn loại điều kiện' }],
  [RULE_FIELDS.TEXT]: [
    { required: true, message: 'Hãy nhập nội dung điều kiện' },
  ],
} as const;
