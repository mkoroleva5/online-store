export const countItems = (length: number, array: string[]) => {
  if (length % 10 === 1 && length % 100 !== 11) {
    return array[0];
  }
  if ((length < 10 || length > 20) && length % 10 > 1 && length % 10 < 5) {
    return array[2];
  }
  return array[1];
};
