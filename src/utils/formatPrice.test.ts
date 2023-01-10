import { formatPrice } from './formatPrice';

describe('FormatPrice function test', () => {
  it('Function returns "2.50"', () => {
    expect(formatPrice(2.5)).toBe('2.50');
  });
  it('Function returns "36.00"', () => {
    expect(formatPrice(36)).toEqual('36.00');
  });
  it('Function returns "75.90"', () => {
    expect(formatPrice(75.9)).toBe('75.90');
  });
  it('Function returns "25.45"', () => {
    expect(formatPrice(25.4545875)).toBe('25.45');
  });
});
