import { useEffect, useReducer, useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from './productCard/ProductCard';
import products from '../../data/products.json';
import { Layout } from './types';
import { CatalogMenu } from './sortMenu/CatalogMenu';
import { Filter } from './filter/Filter';
import { filterReducer, initialFilterState } from '../../store/filterStore/FilterStore';
import { FilterDispatchContext, FilterStateContext } from './filterState';
import { history } from '../../store/filterStore/History';
import { getSearchValue } from '../../utils/searchHelpers';

export const Catalog = () => {
  const [layout, setLayout] = useState<Layout>('table');

  const changeLayout = (val: Layout) => {
    setLayout(val);
  };

  const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      const brand = getSearchValue('brand');
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <FilterStateContext.Provider value={filterState}>
      <FilterDispatchContext.Provider value={dispatch}>
        <main className={style.main}>
          <div className={style.mainWrapper}>
            <Filter />
            <div className={style.catalogWrapper}>
              <CatalogMenu onLayoutChange={changeLayout} />
              <div className={`${style.productsWrapper} ${layout === 'table' ? '' : style.list}`}>
                {products.map((item) => {
                  return (
                    <ProductCard
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      preview={item.preview}
                      stock={item.stock}
                      images={item.images}
                      layout={layout}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};
