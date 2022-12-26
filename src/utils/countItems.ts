export const countItems = (length: number) => {
  const lastNum = +length.toString().split('').reverse()[0];
  if (lastNum === 1 && length !== 11) {
    return 'товар';
  }
  if ((length < 10 || length > 20) && lastNum > 1 && lastNum < 5) {
    return 'товара';
  }
  return 'товаров';
};
