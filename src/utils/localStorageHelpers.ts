export const setLS = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLS = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};

export const removeLS = (key: string) => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};

export const localStorageCartStateName = 'healthy_food_store_cart_state';
