import { useState } from 'react';
import style from './Catalog.module.css';
import { ProductCard } from '../productCard/ProductCard';
import products from '../../data/products.json';
import tableIcon from '../../assets/images/table.png';
import listIcon from '../../assets/images/list.png';
import { Layout } from './types';

export const Catalog = () => {
  const [layout, setLayout] = useState<Layout>('table');
  return (
    <main className={style.main}>
      <div className={style.mainWrapper}>
        <div className={style.buttonsWrapper}>
          <button className={style.displayButton} type="button" onClick={() => setLayout('table')}>
            <img className={style.displayIcon} src={tableIcon} alt="Table layout" />
          </button>
          <button className={style.displayButton} type="button" onClick={() => setLayout('list')}>
            <img className={style.displayIcon} src={listIcon} alt="List layout" />
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
      </div>
    </main>
  );
};
