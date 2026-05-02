export const formatDisplayedNumber = (number: number | string) => {
  const nf = new Intl.NumberFormat('vi-VN');
  return nf.format(Number(number));
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(num);
};
