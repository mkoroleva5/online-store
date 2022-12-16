export const formatPrice = (price: number) => {
  return `${price}`
    .split('.')
    .map((el, ind) => (ind === 1 ? el.padEnd(2, '0') : el))
    .join(',');
};
