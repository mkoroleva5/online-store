import { useCallback, useRef } from 'react';

export function useDebounce<T extends unknown[]>(func: (...args: T) => void, delay: number) {
  const timer = useRef<number | null>(null);

  return useCallback(
    (...args: T) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        timer.current = null;
        func.call(null, ...args);
      }, delay);
    },
    [func, delay],
  );
}
