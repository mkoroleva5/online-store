import { parsePathname } from './pathnameHelpers';

describe('parsePathname', () => {
  it('Returns two strings in array', () => {
    expect(parsePathname('/home/sweets/')).toEqual(['home', 'sweets']);
  });
  it('Returns three strings in array', () => {
    expect(parsePathname('/home/superfoods/65/')).toEqual(['home', 'superfoods', '65']);
  });
  it('Returns empty array for "/"', () => {
    expect(parsePathname('/')).toEqual([]);
  });
  it('Returns empty array for empty string', () => {
    expect(parsePathname('')).toEqual([]);
  });
});
