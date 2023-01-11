import { useEffect, useMemo, useReducer } from 'react';
import { Header } from './components/header/Header';
import { Catalog } from './components/catalog/Catalog';
import { Footer } from './components/footer/Footer';
import { CartStateContext, initialCartState } from './components/cartState';
import { cartReducer } from './store/CartStore';
import { localStorageCartStateName, setLS } from './utils/localStorageHelpers';

export const App = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const cartContext = useMemo(() => ({ cartState, dispatch }), [cartState, dispatch]);

  useEffect(() => {
    setLS(localStorageCartStateName, cartState);
  }, [cartState]);

  return (
    <>
      <CartStateContext.Provider value={cartContext}>
        <Header />
        <Catalog />
      </CartStateContext.Provider>
      <Footer />
    </>
  );
};
