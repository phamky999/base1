export const formatDisplayedNumber = (number: number | string) => {
  const nf = new Intl.NumberFormat('vi-VN');
  return nf.format(Number(number));
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
};

/** Check xem chuỗi có phải là số không. VD
 * '021': string, do giữ số 0 ở đầu
 * '789': number */
export const isNumeric = (val: string) => {
  return (
    /^-?\d+(\.\d+)?$/.test(val) && !(val.length > 1 && val.startsWith('0'))
  );
};

export const displayNumberWithCommas = {
  formatter: (value: number | string) => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${end ? `${v}.${end}` : `${v}`}`;
  },

  parser: (value?: string) => value?.replace(/\$\s?|(,*)/g, ''),
};
