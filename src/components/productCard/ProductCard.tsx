import { Product } from '../../data/product';
import style from './ProductCard.module.css';

export const ProductCard = ({ title, stock, price, preview }: Partial<Product>) => {
  return (
    <div className={style.card_wrapper}>
      <img src={preview} alt={title} />
      <h3 className={style.title}>{title}</h3>
      <p className={style.stock}>{stock}</p>
      <p className={style.price}>{price}</p>
    </div>
  );
};
