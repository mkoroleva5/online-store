import { useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from '../productCard/ProductCard';
import products from '../../data/products.json';

export const Catalog = () => {
  const [layout, setLayout] = useState('table');
  return (
    <main className={style.main}>
      <div>
        <button type="button" onClick={() => setLayout('table')}>
          1
        </button>
        <button type="button" onClick={() => setLayout('list')}>
          2
        </button>
      </div>
      <div className={`${style.catalogWrapper} ${layout === 'table' ? '' : style.list}`}>
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
    </main>
  );
};
