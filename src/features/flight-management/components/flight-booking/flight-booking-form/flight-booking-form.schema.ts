import { Regex, RegexValidationMessage } from '@/lib/validations';

export const FORM_FIELDS = {
  FLIGHT_ID: 'flightId',
  MERCHANT_CODE: 'merchantCode',
  PASSENGERS: 'passengers',
  CONTACT_INFO: 'contactInfo',
} as const;

export const PASSENGER_FIELDS = {
  TYPE: 'type',
  GENDER: 'gender',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  BIRTHDAY: 'birthday',
  DOCUMENT_NUMBER: 'documentNumber',
  DOCUMENT_EXPIRY_DATE: 'documentExpiryDate',
  DOCUMENT_ISSUING_COUNTRY: 'documentIssuingCountry',
  DOCUMENT_NATIONALITY: 'documentNationality',
} as const;

export const CONTACT_FIELDS = {
  GENDER: 'gender',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ADDRESS: 'address',
  PHONE: 'phone',
  EMAIL: 'email',
} as const;

export const FORM_LABELS = {
  [FORM_FIELDS.FLIGHT_ID]: 'Chuyến bay',
  [FORM_FIELDS.MERCHANT_CODE]: 'Merchant',
  [FORM_FIELDS.PASSENGERS]: 'Thông tin hành khách',
  [FORM_FIELDS.CONTACT_INFO]: 'Thông tin liên hệ',
} as const;

export const FORM_VALIDATIONS = {
  [FORM_FIELDS.FLIGHT_ID]: [
    { required: true, message: 'Vui lòng chọn chuyến bay' },
  ],
  [FORM_FIELDS.MERCHANT_CODE]: [
    { required: true, message: 'Vui lòng chọn Merchant' },
  ],
  passenger: {
    [PASSENGER_FIELDS.TYPE]: [
      { required: true, message: 'Vui lòng chọn loại hành khách' },
    ],
    [PASSENGER_FIELDS.GENDER]: [
      { required: true, message: 'Vui lòng chọn giới tính' },
    ],
    [PASSENGER_FIELDS.FIRST_NAME]: [
      {
        required: true,
        message: 'Vui lòng nhập tên hành khách',
        whitespace: true,
      },
    ],
    [PASSENGER_FIELDS.LAST_NAME]: [
      {
        required: true,
        message: 'Vui lòng nhập họ hành khách',
        whitespace: true,
      },
    ],
  },
  contact: {
    [CONTACT_FIELDS.GENDER]: [
      { required: true, message: 'Vui lòng chọn giới tính' },
    ],
    [CONTACT_FIELDS.FIRST_NAME]: [
      {
        required: true,
        message: 'Vui lòng nhập tên liên hệ',
        whitespace: true,
      },
    ],
    [CONTACT_FIELDS.LAST_NAME]: [
      { required: true, message: 'Vui lòng nhập họ liên hệ', whitespace: true },
    ],
    [CONTACT_FIELDS.ADDRESS]: [
      {
        required: true,
        message: 'Vui lòng nhập địa chỉ liên hệ',
        whitespace: true,
      },
    ],
    [CONTACT_FIELDS.PHONE]: [
      { required: true, message: 'Vui lòng nhập số điện thoại' },
      {
        pattern: Regex.PHONE_NUMBER,
        message: RegexValidationMessage.PHONE_NUMBER,
      },
    ],
    [CONTACT_FIELDS.EMAIL]: [
      { required: true, message: 'Vui lòng nhập email liên hệ' },
      { pattern: Regex.EMAIL, message: RegexValidationMessage.EMAIL },
    ],
  },
};
