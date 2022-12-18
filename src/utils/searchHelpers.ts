import { history } from '../store/filterStore/History';

export const deleteSearchValue = (key: string) => {
  const searchParams = new URLSearchParams(history.location.search);
  searchParams.delete(key);
  history.push({ ...history.location, search: searchParams.toString() });
};

export const getSearchValue = (key: string) => {
  const searchParams = new URLSearchParams(history.location.search);
  // const params = Object.fromEntries(searchParams.entries());

  return searchParams.get(key);
};

export const getArraySearchValue = (key: string) => {
  const searchParams = new URLSearchParams(history.location.search);
  if (searchParams) {
    const param = searchParams.get(key)?.split('-and-');
    if (param && param?.length > 1) {
      return param;
    }
    const keySearchParams = searchParams.get(key);
    return typeof keySearchParams === 'string' ? [keySearchParams] : null;
  }
  return null;
};

export const updateSearchValue = (key: string, val: string | number | null) => {
  const searchParams = new URLSearchParams(history.location.search);
  if (!val) {
    deleteSearchValue(key);
    return;
  }
  if (searchParams.get(key)) {
    searchParams.set(key, val);
    history.push({ ...history.location, search: searchParams.toString() });
  } else {
    searchParams.append(key, val);
    history.push({ ...history.location, search: searchParams.toString() });
  }
};
