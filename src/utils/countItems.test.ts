import { countItems } from './countItems';

describe('сountItems', () => {
  it('Returns "Найден 1"', () => {
    expect(countItems(1, ['Найден', 'Найдено', 'Найдено'])).toBe('Найден');
  });
  it('Returns "Найдено 12"', () => {
    expect(countItems(12, ['Найден', 'Найдено', 'Найдено'])).toBe('Найдено');
  });
  it('Returns "3 товара"', () => {
    expect(countItems(3, ['товар', 'товаров', 'товара'])).toBe('товара');
  });
  it('Returns "11 товаров"', () => {
    expect(countItems(11, ['товар', 'товаров', 'товара'])).toBe('товаров');
  });
  it('Returns "1 товар"', () => {
    expect(countItems(1, ['товар', 'товаров', 'товара'])).toBe('товар');
  });
});
