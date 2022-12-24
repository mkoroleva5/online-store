import { CartProduct } from '../../../data/product';
import { AmountCounter } from '../../basic-components/BasicComponents';
import style from './CartProduct.module.css';
import noImage from '../../../assets/images/default.jpg';
import { history } from '../../../store/filterStore/History';

interface CartProductCardProps {
  item: CartProduct;
}

export const CartProductCard = ({ item }: CartProductCardProps) => {
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
          <img className={style.itemImage} src={item.images[0] || noImage} alt={item.title} />
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
      <AmountCounter item={item} />
      <div className={style.sum}>{item.price * item.amount} BYN</div>
    </div>
  );
};
