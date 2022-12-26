import classNames from 'classnames';
import { Product } from '../../../data/product';
import { history } from '../../../store/History';
import style from './CategoriesMenu.module.css';

interface CategoriesMenuProps {
  products: Product[];
  activeCategory: string;
}
export const CategoriesMenu = ({ products, activeCategory }: CategoriesMenuProps) => {
  const categories = [...new Set(products.map((item): string => item.category))];
  const paths = [
    ...new Set(products.filter((el) => el.catPath).map((item): string => item.catPath)),
  ];

  return (
    <ul className={style.list}>
      <li>
        <button
          type="button"
          className={classNames(style.item, { [style.active]: !activeCategory })}
          onClick={() => {
            const searchParams = new URLSearchParams(history.location.search);
            history.push({ pathname: '/', search: searchParams.toString() });
          }}
        >
          Все
        </button>
      </li>
      {categories.map((item, index) => {
        return (
          <li key={item}>
            <button
              type="button"
              className={classNames(style.item, {
                [style.active]: activeCategory === paths[index],
              })}
              onClick={() => {
                const searchParams = new URLSearchParams(history.location.search);
                history.push({ pathname: paths[index], search: searchParams.toString() });
              }}
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
