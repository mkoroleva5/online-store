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

export const updateSearchValue = (key: string, val: string | null) => {
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
