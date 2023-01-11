import classNames from 'classnames';
import { useContext } from 'react';
import { Product } from '../../data/product';
import { history } from '../../store/History';
import { CartState } from '../cartState';
import style from './InCartButton.module.css';

interface InCartButtonProps {
  product: Product;
}
export const InCartButton = (props: InCartButtonProps) => {
  const { cartState, dispatch } = useContext(CartState);
  const { product } = props;
  const { id } = product;

  return (
    <button
      type="button"
      className={classNames(style.button, { [style.inCart]: cartState.products[id] })}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        if (cartState.products[id]) history.push('/cart');
      }}
    >
      {!cartState.products[id] ? 'В корзину' : 'В корзине'}
    </button>
  );
};
