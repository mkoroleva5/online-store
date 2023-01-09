import { countItems } from './countItems';

describe('сountItems', () => {
  it('Returns "3 товара"', () => {
    expect(countItems(3)).toBe('товара');
  });
  it('Returns "25 товаров"', () => {
    expect(countItems(25)).toBe('товаров');
  });
  it('Returns "41 товар"', () => {
    expect(countItems(41)).toBe('товар');
  });
});
