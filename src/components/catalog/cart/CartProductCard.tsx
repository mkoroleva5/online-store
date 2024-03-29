import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { CartProduct } from '../../../data/product';
import style from './CartProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import trashIcon from '../../../assets/icons/trash.svg';
import { CartStateContext } from '../../cartState';
import { ImageSpinner } from '../../basic-components/ImageSpinner';
import { AmountCounter } from '../../basic-components/AmountCounter';
import { useOnScreen } from '../../../hooks/use-on-screen';
import { Link } from '../../basic-components/Link';

interface CartProductCardProps {
  item: CartProduct;
  index: number;
}

export const CartProductCard = ({ item, index }: CartProductCardProps) => {
  const { dispatch } = useContext(CartStateContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
    <div className={style.productWrapper}>
      <div className={style.itemIndex}>{index}</div>
      <div key={item.id} className={style.itemWrapper}>
        <div className={style.itemInfoWrapper} ref={containerRef}>
          <Link href={`/${item.catPath}/${item.id}`}>
            {(isVisible || isImageLoaded) && (
              <img
                className={classNames(style.itemImage, { [style.loadedImg]: isImageLoaded })}
                src={item.images[0] || noImage}
                alt={item.title}
                ref={imageRef}
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.complete) setIsImageLoaded(true);
                  else setIsImageLoaded(false);
                }}
              />
            )}
            {!isImageLoaded && <ImageSpinner small />}
          </Link>
          <div className={style.itemInfo}>
            <Link className={style.itemTitle} href={`/${item.catPath}/${item.id}`}>
              {item.title}
            </Link>
            <div>Бренд: {item.brand}</div>
            <div>Категория: {item.category}</div>
          </div>
        </div>
        <div className={style.controlsWrapper}>
          <AmountCounter id={item.id} />
          <div className={style.sumWrapper}>
            <div className={style.sum}>{(item.price * item.amount).toFixed(2)} BYN</div>
            <div className={style.stock}>В наличии: {item.stock}</div>
          </div>
          <button
            type="button"
            className={style.deleteButton}
            onClick={() =>
              dispatch({
                type: 'REMOVE_PRODUCT',
                payload: item,
              })
            }
          >
            <img className={style.deleteIcon} src={trashIcon} alt="Delete button" />
          </button>
        </div>
      </div>
    </div>
  );
};
