import { CartState } from '../components/cartStateTypes';

export const setLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLS = (key: string): CartState | null => {
  const value = localStorage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    }
  } catch (err) {
    localStorage.removeItem(key);
    return null;
  }
  return null;
};

export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};

export const localStorageCartStateName = 'healthy_food_store_cart_state';
