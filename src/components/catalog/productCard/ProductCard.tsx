import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import { Layout } from '../types';
import { formatPrice } from '../../../utils/formatPrice';
import { ImageSpinner } from '../../basic-components/ImageSpinner';

interface ProductProps extends Pick<Product, 'title' | 'stock' | 'price' | 'preview' | 'images'> {
  layout: Layout;
}

export const ProductCard = ({ title, stock, price, preview, images, layout }: ProductProps) => {
  const [hover, setHover] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const tableLayout = layout === 'table';
  const listLayout = layout === 'list';
  return (
    <div
      className={classNames({
        [style.cardWrapperTable]: tableLayout,
        [style.cardWrapperList]: listLayout,
      })}
    >
      <img
        src={preview || noImage}
        alt={title}
        className={classNames({
          [style.imgTable]: tableLayout,
          [style.imgList]: listLayout,
          [style.loadedImg]: isImageLoaded,
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.complete) setIsImageLoaded(true);
          else setIsImageLoaded(false);
        }}
      />
      <img
        src={images[1] || noImage}
        alt={title}
        style={hover ? { opacity: '1' } : { opacity: '0' }}
        className={classNames({
          [style.secondImgTable]: tableLayout,
          [style.secondImgList]: listLayout,
          [style.loadedImg]: isImageLoaded,
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.complete) setIsImageLoaded(true);
          else setIsImageLoaded(false);
        }}
      />
      {!isImageLoaded && <ImageSpinner displayList={listLayout} />}
      <div
        className={classNames({
          [style.cardInfoTable]: tableLayout,
          [style.cardInfoList]: listLayout,
        })}
      >
        <h3
          className={classNames(style.title, {
            [style.titleList]: listLayout,
          })}
        >
          {title}
        </h3>
        <p className={style.stock}>В наличии: {stock}</p>
        <p className={style.price}>{formatPrice(price)} BYN</p>
        <button type="button" className={style.button}>
          В корзину
        </button>
      </div>
    </div>
  );
};
