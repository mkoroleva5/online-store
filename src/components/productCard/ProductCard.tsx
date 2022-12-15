import { useState } from 'react';
import { Product } from '../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../assets/images/default.jpg';

export const ProductCard = ({
  title,
  stock,
  price,
  preview,
  images,
}: Pick<Product, 'title' | 'stock' | 'price' | 'preview' | 'images'>) => {
  const [hover, setHover] = useState(false);
  return (
    <div className={style.cardWrapper}>
      <img
        src={`${hover ? images[1] || noImage : preview || noImage}`}
        alt={title}
        className={style.img}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
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
