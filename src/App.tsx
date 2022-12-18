import { Header } from './components/header/Header';
import { Catalog } from './components/catalog/Catalog';
import { Footer } from './components/footer/Footer';
import { QueryParamsListener } from './services/QueryParamsListener';

export const App = () => {
  return (
    <>
      <Header />
      <QueryParamsListener />
      <Catalog />
      <Footer />
    </>
  );
};
