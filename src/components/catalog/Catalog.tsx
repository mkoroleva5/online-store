import style from './Catalog.module.css';
import { ProductCard } from '../productCard/ProductCard';
import products from '../../data/products.json';

export const Catalog = () => {
  return (
    <main className={style.main}>
      <div className={style.catalogWrapper}>
        {products.map((item) => {
          return (
            <ProductCard
              key={item.id}
              title={item.title}
              price={item.price}
              preview={item.preview}
              stock={item.stock}
              images={item.images}
            />
          );
        })}
      </div>
    </main>
  );
};
