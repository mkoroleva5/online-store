import { useEffect, useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from './productCard/ProductCard';
import products from '../../data/products.json';
import { CatalogMenu } from './sortMenu/CatalogMenu';
import { Filter } from './filter/Filter';
import { history } from '../../store/filterStore/History';
import { getArraySearchValue } from '../../utils/searchHelpers';
import { FilterState, initialFilterState } from './filterState';

export const Catalog = () => {
  const [filterState, setFilterState] = useState(initialFilterState);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setFilterState((prevState) => {
        const brandState = getArraySearchValue('brand');
        const productState = getArraySearchValue('product');
        return {
          ...prevState,
          brand: brandState,
          product: productState,
        };
      });
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <FilterState.Provider value={filterState}>
      <main className={style.main}>
        <div className={style.mainWrapper}>
          <Filter />
          <div className={style.catalogWrapper}>
            <CatalogMenu onLayoutChange={() => {}} />
            <div
              className={`${style.productsWrapper} ${
                filterState.display === 'table' ? '' : style.list
              }`}
            >
              {products.map((item) => {
                return (
                  <ProductCard
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    preview={item.preview}
                    stock={item.stock}
                    images={item.images}
                    layout={filterState.display}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </FilterState.Provider>
  );
};
