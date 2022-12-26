import { useContext, useState } from 'react';
import classNames from 'classnames';
import { CartProduct } from '../../../data/product';
import { AmountCounter } from '../../basic-components/BasicComponents';
import style from './CartProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import { history } from '../../../store/History';
import { CartState } from '../../cartState';
import { ImageSpinner } from '../../basic-components/ImageSpinner';

interface CartProductCardProps {
  item: CartProduct;
}

export const CartProductCard = ({ item }: CartProductCardProps) => {
  const { dispatch } = useContext(CartState);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div key={item.id} className={style.itemWrapper}>
      <div className={style.itemInfoWrapper}>
        <div
          onClick={() => {
            history.push(`/${item.catPath}/${item.id}`);
          }}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <img
            className={classNames(style.itemImage, { [style.loadedImg]: isImageLoaded })}
            src={item.images[0] || noImage}
            alt={item.title}
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.complete) setIsImageLoaded(true);
              else setIsImageLoaded(false);
            }}
          />
          {!isImageLoaded && <ImageSpinner />}
        </div>

        <div className={style.itemInfo}>
          <div
            className={style.itemTitle}
            onClick={() => {
              history.push(`/${item.catPath}/${item.id}`);
            }}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            {item.title}
          </div>
          <div>Бренд: {item.brand}</div>
          <div>Категория: {item.category}</div>
        </div>
      </div>
      <AmountCounter id={item.id} />
      <div className={style.sum}>{(item.price * item.amount).toFixed(2)} BYN</div>
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: 'REMOVE_PRODUCT',
            payload: item,
          })
        }
      >
        X
      </button>
    </div>
  );
};