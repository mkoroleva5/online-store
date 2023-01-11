import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Product } from '../../../data/product';
import style from './ProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import { Layout } from '../types';
import { formatPrice } from '../../../utils/formatPrice';
import { ImageSpinner } from '../../basic-components/ImageSpinner';
import { history } from '../../../store/History';
import { InCartButton } from '../../basic-components/InCartButton';
import { useOnScreen } from '../../../hooks/use-on-screen';

interface ProductProps {
  product: Product;
  layout: Layout;
  path: string;
}

export const ProductCard = ({ product, layout, path }: ProductProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const tableLayout = layout === 'table';
  const listLayout = layout === 'list';

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsImageLoaded(true);
      };
    }
  }, [isVisible, isImageLoaded]);

  return (
    <div
      className={classNames({
        [style.cardWrapperTable]: tableLayout,
        [style.cardWrapperList]: listLayout,
      })}
      onClick={() => {
        history.push(path);
      }}
      ref={containerRef}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      {(isVisible || isImageLoaded) && (
        <>
          <img
            src={product.preview || noImage}
            alt={product.title}
            className={classNames({
              [style.imgTable]: tableLayout,
              [style.imgList]: listLayout,
              [style.loadedImg]: isImageLoaded,
            })}
            ref={imageRef}
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
          />
        </>
      )}
      {!isImageLoaded && <ImageSpinner displayList />}
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
