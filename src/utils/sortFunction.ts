import { Product } from '../data/product';

export const sortArray = (
  array: Product[],
  property: 'title' | 'price',
  direction: 'up' | 'down',
) => {
  if (direction === 'up') {
    array.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  } else {
    array.sort((a, b) => {
      if (a[property] > b[property]) return -1;
      if (a[property] < b[property]) return 1;
      return 0;
    });
  }
};
