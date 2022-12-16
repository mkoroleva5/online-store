import { useState } from 'react';
import { Product } from '../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../assets/images/default.jpg';
import { Layout } from '../catalog/types';

interface ProductProps extends Pick<Product, 'title' | 'stock' | 'price' | 'preview' | 'images'> {
  layout: Layout;
}

export const ProductCard = ({ title, stock, price, preview, images, layout }: ProductProps) => {
  const [hover, setHover] = useState(false);

  return (
    <div className={`${layout === 'table' ? style.cardWrapperTable : style.cardWrapperList}`}>
      <img
        src={`${hover ? images[1] || noImage : preview || noImage}`}
        alt={title}
        className={`${layout === 'table' ? style.imgTable : style.imgList}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <div className={`${layout === 'table' ? style.cardInfoTable : style.cardInfoList}`}>
        <h3 className={`${style.title} ${layout === 'table' ? '' : style.titleList}`}>{title}</h3>
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
    </div>
  );
};
