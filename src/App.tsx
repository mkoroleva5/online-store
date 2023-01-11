import { useMemo, useReducer } from 'react';
import { Header } from './components/header/Header';
import { Catalog } from './components/catalog/Catalog';
import { Footer } from './components/footer/Footer';
import { CartStateContext, initialCartState } from './components/cartState';
import { cartReducer } from './store/CartStore';

export const App = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const cartContext = useMemo(() => ({ cartState, dispatch }), [cartState, dispatch]);

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
