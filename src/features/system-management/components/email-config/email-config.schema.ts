export const FORM_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
  HOST: 'host',
  PORT: 'port',
  SENDER_NAME: 'senderName',
  CC_EMAIL: 'ccEmail',
  ENABLE_SSL: 'enableSSL',
} as const;

export const FORM_LABELS = {
  [FORM_FIELDS.EMAIL]: 'Email',
  [FORM_FIELDS.PASSWORD]: 'Mật khẩu',
  [FORM_FIELDS.HOST]: 'Host (Máy chủ)',
  [FORM_FIELDS.PORT]: 'Port (Cổng)',
  [FORM_FIELDS.SENDER_NAME]: 'Tên người gửi',
  [FORM_FIELDS.CC_EMAIL]: 'CC Email',
  [FORM_FIELDS.ENABLE_SSL]: 'Kích hoạt SSL',
};

export const FORM_VALIDATIONS = {
  [FORM_FIELDS.EMAIL]: [
    { required: true, message: 'Vui lòng nhập Email' },
    { type: 'email' as const, message: 'Email không hợp lệ' },
  ],
  [FORM_FIELDS.PASSWORD]: [
    { required: true, message: 'Vui lòng nhập mật khẩu' },
  ],
  [FORM_FIELDS.HOST]: [
    { required: true, message: 'Vui lòng nhập máy chủ (host)' },
  ],
  [FORM_FIELDS.PORT]: [
    { required: true, message: 'Vui lòng nhập cổng (port)' },
  ],
  [FORM_FIELDS.SENDER_NAME]: [
    { required: true, message: 'Vui lòng nhập tên người gửi' },
  ],
  [FORM_FIELDS.CC_EMAIL]: [
    { type: 'email' as const, message: 'Email không hợp lệ' },
  ],
};
