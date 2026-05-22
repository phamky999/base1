type RegexKey =
  | 'AIRLINE_CODE'
  | 'AIRPORT_CODE'
  | 'EMAIL'
  | 'FLIGHT_NUMBER'
  | 'FULL_NAME'
  | 'INTEGER_NUMBER'
  | 'MEMBER_GROUP_CODE'
  | 'NUMBER'
  | 'PASSWORD'
  | 'PHONE_NUMBER'
  | 'PNR'
  | 'URL'
  | 'USERNAME'
  | 'VN_ID'
  | 'INVITE_CODE'
  | 'PROMO_CODE'
  | 'ASCII_TEXT'
  | 'IDENTIFICATION_PASSPORT'
  | 'DOMAIN'
  | 'MERCHANT_CODE';

export const Regex: Record<RegexKey, RegExp> = {
  AIRLINE_CODE: /^[A-Za-z0-9]{2}$/,
  AIRPORT_CODE: /^[A-Za-z]{3}$/,
  EMAIL: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
  FLIGHT_NUMBER: /^[A-Za-z0-9]{2}\d{2,4}$/,
  FULL_NAME: /^[\p{L}\s]+ [\p{L}\s]+$/u,
  INTEGER_NUMBER: /^[+-]?\d+$/,
  MEMBER_GROUP_CODE: /^[A-Za-z][A-Za-z\d]{1,9}$/,
  NUMBER: /^[0-9]+$/,
  PASSWORD: /^\S{8,}$/,
  PHONE_NUMBER: /^\d{10,12}$/,
  PNR: /^[A-Za-z0-9]{6}$/,
  URL: /^[a-zA-Z0-9-]+$/,
  USERNAME: /^[A-Za-z][A-Za-z0-9_]{3,30}$/,
  VN_ID: /^\d{10}(\d{2})?$/,
  INVITE_CODE: /^[A-Z0-9-_]+$/,
  PROMO_CODE: /^[A-Z0-9-_]+$/,
  // eslint-disable-next-line no-control-regex
  ASCII_TEXT: /^[\x00-\x7F]+$/,
  IDENTIFICATION_PASSPORT: /^(\d{10}(\d{2})?|[A-Z0-9]{6,9})$/,
  DOMAIN: /^((www.)?([a-zA-Z0-9-]+.)+[a-zA-Z]+(.[a-zA-Z]+)*)$/,
  MERCHANT_CODE: /^[A-Za-z0-9]{2,20}$/,
};

export const RegexValidationMessage: Record<RegexKey, string> = {
  AIRLINE_CODE: 'Hãy nhập 2 ký tự (chữ cái không dấu, chữ số)',
  AIRPORT_CODE: 'Hãy nhập 3 ký tự (chữ cái không dấu)',
  EMAIL: 'Vui lòng nhập đúng định dạng email',
  FLIGHT_NUMBER: 'Hãy nhập đúng định dạng số hiệu chuyến bay',
  FULL_NAME: 'Vui lòng nhập đúng định dạng họ tên',
  INTEGER_NUMBER: 'Vui lòng nhập số nguyên',
  MEMBER_GROUP_CODE:
    'Vui lòng chỉ nhập từ 1 đến 10 ký tự chữ không dấu in hoa, chữ thường, chữ số',
  NUMBER: 'Vui lòng chỉ nhập số',
  PASSWORD: 'Mật khẩu bao gồm tối thiểu 8 ký tự không bao gồm khoảng trắng',
  PHONE_NUMBER: 'Số điện thoại bao gồm 10 đến 12 ký tự số',
  PNR: 'Mã PNR gồm 6 ký tự chữ cái không dấu & chữ số',
  URL: 'Custom URL chỉ cho phép nhập chữ cái không dấu, số và gạch nối',
  USERNAME:
    'Tên tài khoản bao gồm 3 đến 30 ký tự chữ không dấu, chữ số, dấu gạch dưới',
  VN_ID: 'Vui lòng nhập đúng định dạng số CCCD',
  INVITE_CODE:
    'Vui lòng chỉ nhập chữ không dấu in hoa, chữ số, dấu gạch ngang, dấu gạch dưới',
  PROMO_CODE: 'Vui lòng chỉ nhập chữ không dấu in hoa, chữ số',
  ASCII_TEXT: 'Vui lòng chỉ nhập các ký tự không dấu',
  IDENTIFICATION_PASSPORT:
    'Vui lòng nhập đúng định dạng số CCCD (10-12 số) hoặc hộ chiếu (6-9 ký tự)',
  DOMAIN: 'Vui lòng nhập đúng định dạng tên miền',
  MERCHANT_CODE:
    'Vui lòng chỉ nhập từ 2 đến 20 ký tự chữ không dấu, chữ số, dấu gạch dưới',
};
