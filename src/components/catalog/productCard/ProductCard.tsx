import { useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import { Layout } from '../types';
import { formatPrice } from '../../../utils/formatPrice';
import { ImageSpinner } from '../../basic-components/ImageSpinner';
import { history } from '../../../store/History';
import { InCartButton } from '../../basic-components/BasicComponents';

interface ProductProps {
  product: Product;
  layout: Layout;
  path: string;
}

export const ProductCard = ({ product, layout, path }: ProductProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const tableLayout = layout === 'table';
  const listLayout = layout === 'list';
  return (
    <div
      className={classNames({
        [style.cardWrapperTable]: tableLayout,
        [style.cardWrapperList]: listLayout,
      })}
      onClick={() => {
        history.push(path);
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
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.complete) setIsImageLoaded(true);
          else setIsImageLoaded(false);
        }}
      />
      <img
        src={product.images[1] || noImage}
        alt={product.title}
        className={classNames({
          [style.secondImgTable]: tableLayout,
          [style.secondImgList]: listLayout,
          [style.loadedImg]: isImageLoaded,
        })}
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
        <InCartButton key={product.id} product={product} />
      </div>
    </div>
  );
};
