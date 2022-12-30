import { useContext, useState } from 'react';
import classNames from 'classnames';
import { CartProduct } from '../../../data/product';
import style from './CartProductCard.module.css';
import noImage from '../../../assets/images/default.jpg';
import trashIcon from '../../../assets/icons/trash.svg';
import { history } from '../../../store/History';
import { CartState } from '../../cartState';
import { ImageSpinner } from '../../basic-components/ImageSpinner';
import { AmountCounter } from '../../basic-components/AmountCounter';

interface CartProductCardProps {
  item: CartProduct;
  index: number;
}

export const CartProductCard = ({ item, index }: CartProductCardProps) => {
  const { dispatch } = useContext(CartState);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className={style.productWrapper}>
      <div className={style.itemIndex}>{index}</div>
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
  );
};
