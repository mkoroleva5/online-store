import { useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from './productCard/ProductCard';
import products from '../../data/products.json';
import { Layout } from './types';
import { CatalogMenu } from './sortMenu/CatalogMenu';
import { Filter } from './filter/Filter';

export const Catalog = () => {
  const [layout, setLayout] = useState<Layout>('table');

  const changeLayout = (val: Layout) => {
    setLayout(val);
  };

  return (
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
  );
};
