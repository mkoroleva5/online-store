import { useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import { Layout } from '../types';
import { formatPrice } from '../../../utils/formatPrice';
import { ImageSpinner } from '../../basic-components/ImageSpinner';
import { history } from '../../../store/filterStore/History';
import { CartState } from '../../cartState';

interface ProductProps {
  product: Product;
  layout: Layout;
  path: string;
}

export const ProductCard = ({ product, layout, path }: ProductProps) => {
  const [hover, setHover] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const button = useRef(null);
  const { cartState, dispatch } = useContext(CartState);

  const tableLayout = layout === 'table';
  const listLayout = layout === 'list';
  return (
    <div
      className={classNames({
        [style.cardWrapperTable]: tableLayout,
        [style.cardWrapperList]: listLayout,
      })}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target !== button.current) {
          history.push(path);
        }
      }}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <img
        src={product.preview || noImage}
        alt={product.title}
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
        src={product.images[1] || noImage}
        alt={product.title}
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
          {product.title}
        </h3>
        <p className={style.stock}>В наличии: {product.stock}</p>
        <p className={style.price}>{formatPrice(product.price)} BYN</p>
        <button
          ref={button}
          type="button"
          className={style.button}
          onClick={() => {
            dispatch({ type: 'ADD_PRODUCT', payload: product });
            console.log(cartState);
          }}
        >
          В корзину
        </button>
      </div>
    </div>
  );
};
