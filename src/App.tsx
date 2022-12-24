import { useState } from 'react';
import { Header } from './components/header/Header';
import { Catalog } from './components/catalog/Catalog';
import { Footer } from './components/footer/Footer';
import { CartState, initialCartState } from './components/cartState';

export const App = () => {
  const [cartState, setCartState] = useState(initialCartState);
  return (
    <>
      <CartState.Provider value={{ cartState, setCartState }}>
        <Header />
        <Catalog />
      </CartState.Provider>
      <Footer />
    </>
  );
};
