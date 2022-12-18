import { useEffect, useState } from 'react';
import { history } from '../store/filterStore/History';
import { getSearchValue, updateSearchValue } from '../utils/searchHelpers';

export const QueryParamsListener = () => {
  const [count, setCount] = useState(() => getSearchValue('count'));
  const [count2, setCount2] = useState(() => getSearchValue('count2'));

  console.log(count);

  useEffect(() => {
    updateSearchValue('count', count);
    updateSearchValue('count2', count2);

    const unlisten = history.listen(({ location, action }) => {
      console.log(action);
    });

    return () => {
      unlisten();
    };
  }, [count, count2]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setCount((prev) => `${prev ? +prev + 1 : 1}`);
        }}
      >
        {count || 0}
      </button>
      <button
        type="button"
        onClick={() => {
          setCount2((prev) => `${prev ? +prev + 1 : 1}`);
        }}
      >
        {count2 || 0}
      </button>
      <button
        type="button"
        onClick={() => {
          setCount(null);
        }}
      >
        123
      </button>
    </>
  );
};
