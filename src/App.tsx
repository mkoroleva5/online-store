import { useMemo, useReducer } from 'react';
import { Header } from './components/header/Header';
import { Catalog } from './components/catalog/Catalog';
import { Footer } from './components/footer/Footer';
import { CartState, initialCartState } from './components/cartState';
import { cartReducer } from './store/CartStore';

export const App = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  const cartContext = useMemo(() => ({ cartState, dispatch }), [cartState, dispatch]);
  return (
    <>
      <CartState.Provider value={cartContext}>
        <Header />
        <Catalog />
      </CartState.Provider>
      <Footer />
    </>
  );
};
