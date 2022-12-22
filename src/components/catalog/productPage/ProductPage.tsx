import { Product } from '../../../data/product';
import { history } from '../../../store/filterStore/History';
import { formatPrice } from '../../../utils/formatPrice';

import style from './ProductPage.module.css';

interface ProductPageProps {
  product: Product;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <section className={style.wrapper}>
      <div className={style.breadCrumbs}>
        <a
          className={style.link}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            history.push({ pathname: '/' });
          }}
        >
          Главная
        </a>
        {'>'}
        <a
          className={style.link}
          href={`/${product.catPath}`}
          onClick={(e) => {
            e.preventDefault();
            history.push({ pathname: `/${product.catPath}` });
          }}
        >
          {product.category}
        </a>{' '}
        {'>'} <span>{product.brand}</span> {'>'} <span>{product.title}</span>
      </div>
      <h1 className={style.title}>{product.title}</h1>
      <div className={style.infoWrapper}>
        <div className={style.images}>
          {product.images.map((el) => {
            return <img className={style.img} src={el} alt={product.title} key={el} />;
          })}
        </div>
        <div className={style.info}>
          <div>Бренд: {product.brand}</div>
          <div className={style.price}>{formatPrice(product.price)} BYN</div>
          <div>В наличии: {product.stock}</div>
          <button type="button" className={style.button}>
            В корзину
          </button>
        </div>
      </div>

      <div className={style.description}>{product.description}</div>
    </section>
  );
};
