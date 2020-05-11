export const isToday = (date: Date) => {
  const now = new Date();

  return asStandardDateFormat(now) === asStandardDateFormat(date);
};

const as2Digits = (val: number) => `0${val}`.slice(-2);

export const asStandardDateFormat = (date: Date) => {
  const month = as2Digits(date.getMonth() + 1);
  const day = as2Digits(date.getDate());

  return `${day}.${month}.${date.getFullYear()}`;
};

export const asStandardTimeFormat = (date: Date) => {
  const hours = as2Digits(date.getHours());
  const minutes = as2Digits(date.getMinutes());

  return `${hours}:${minutes}`;
};
