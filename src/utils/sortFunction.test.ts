import { Product } from '../data/product';
import { sortArray } from './sortFunction';

const createProduct = (product: Partial<Product>) => {
  return {
    id: 0,
    title: '',
    description: '',
    price: 0,
    stock: 0,
    brand: '',
    category: '',
    catPath: '',
    type: '',
    preview: '',
    images: [],
    ...product,
  };
};

describe('sortArray', () => {
  it('Sorts by title up', () => {
    const products = [
      createProduct({ title: 'Печенье безглютеновое «Клубника» Bite' }),
      createProduct({ title: 'Батончик с протеином «Мята» Bite' }),
      createProduct({ title: 'Чай «Травки для легкости» ТРАВКИ' }),
      createProduct({ title: 'Сыродавленное Миндальное масло с Белым Трюфелем TRAWA' }),
    ];

    sortArray(products, 'title', 'up');
    expect(products).toEqual([
      createProduct({ title: 'Батончик с протеином «Мята» Bite' }),
      createProduct({ title: 'Печенье безглютеновое «Клубника» Bite' }),
      createProduct({ title: 'Сыродавленное Миндальное масло с Белым Трюфелем TRAWA' }),
      createProduct({ title: 'Чай «Травки для легкости» ТРАВКИ' }),
    ]);
  });
  it('Sorts by price down', () => {
    const products = [
      createProduct({ price: 9.54 }),
      createProduct({ price: 4.45 }),
      createProduct({ price: 61.7 }),
      createProduct({ price: 45.2 }),
    ];

    sortArray(products, 'price', 'down');
    expect(products).toEqual([
      createProduct({ price: 61.7 }),
      createProduct({ price: 45.2 }),
      createProduct({ price: 9.54 }),
      createProduct({ price: 4.45 }),
    ]);
  });
  it('Sorts by price up', () => {
    const products = [
      createProduct({ price: 9.54 }),
      createProduct({ price: 4.45 }),
      createProduct({ price: 61.7 }),
      createProduct({ price: 45.2 }),
    ];

    sortArray(products, 'price', 'up');
    expect(products).toEqual([
      createProduct({ price: 4.45 }),
      createProduct({ price: 9.54 }),
      createProduct({ price: 45.2 }),
      createProduct({ price: 61.7 }),
    ]);
  });
});
