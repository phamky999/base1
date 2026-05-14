export const trimmedSpacesKeyword = (keyword?: string) => {
  if (!keyword) return '';
  return keyword.trim().replace(/ +(?= )/g, '');
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' '
  );
  return str;
};

export const filterByNoTone = (input: string, label?: unknown): boolean => {
  if (typeof label !== 'string') return false;

  const sanitizedInput = input.replace(/[^\p{L}\p{N}\s]/gu, '');

  if (!sanitizedInput.trim()) return false;

  const normalizedLabel = removeVietnameseTones(label.toLowerCase());
  const normalizedInput = removeVietnameseTones(sanitizedInput.toLowerCase());

  return normalizedLabel.includes(normalizedInput);
};

export const formatDisplayCurrency = (
  price: number,
  currency = 'VND'
): string => {
  const config: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency || 'VND',
  };

  let locale: string;

  switch (currency) {
    case 'USD':
      locale = 'en-US';
      break;
    default:
      locale = 'vi-VN';
  }

  return price !== undefined
    ? new Intl.NumberFormat(locale, config).format(price)
    : '-';
};

export const capitalizeFirstLetterOfEachWord = (name: string) => {
  if (!name) return '';
  return name
    .toLocaleLowerCase()
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const removeFileExtension = (fileName: string) => {
  if (!fileName) return '';
  return fileName.split('.').slice(0, -1).join('.');
};

export const getFileExtension = (fileName: string) => {
  if (!fileName || typeof fileName !== 'string') return '';
  return fileName.toLowerCase().split('.').pop();
};

export const upperCaseValue = (value?: string) => {
  if (!value) return '';
  return value.toUpperCase();
};
