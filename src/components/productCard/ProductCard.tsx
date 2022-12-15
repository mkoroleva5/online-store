import { Product } from '../../data/product';
import style from './ProductCard.module.css';

export const ProductCard = ({
  title,
  stock,
  price,
  preview,
}: Pick<Product, 'title' | 'stock' | 'price' | 'preview'>) => {
  return (
    <div className={style.cardWrapper}>
      <img src={preview} alt={title} className={style.img} />
      <h3 className={style.title}>{title}</h3>
      <p className={style.stock}>В наличии: {stock}</p>
      <p className={style.price}>
        {`${price}`
          .split('.')
          .map((el, ind) => (ind === 1 ? el.padEnd(2, '0') : el))
          .join(',')}{' '}
        BYN
      </p>
      <button type="button" className={style.button}>
        В корзину
      </button>
    </div>
  );
};
