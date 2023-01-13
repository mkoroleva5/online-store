import { deleteSearchValue, getSearchValue, updateSearchValue } from './searchHelpers';
import { history } from '../store/History';

describe('search params functions tests', () => {
  beforeEach(() => {
    const searchParams = new URLSearchParams(history.location.search);
    searchParams.append('test1', 'test1');
    searchParams.append('test2', 'test2');
    history.push({ search: searchParams.toString() });
  });
  afterAll(() => {
    deleteSearchValue('test1');
    deleteSearchValue('test2');
  });
  it('Removes param from search params', () => {
    deleteSearchValue('test1');
    expect(history.location.search).toEqual('?test2=test2');
  });
  it('Gets param value from search params', () => {
    expect(getSearchValue('test2')).toEqual('test2');
  });
  it('Updates param value in search params', () => {
    updateSearchValue('test1', 'test3');
    updateSearchValue('test2', 'test3');
    expect(history.location.search).toEqual('?test2=test3&test1=test3');
  });
});
