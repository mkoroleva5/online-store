import classNames from 'classnames';
import { useState } from 'react';
import { Product } from '../../../data/product';
import { history } from '../../../store/filterStore/History';
import { formatPrice } from '../../../utils/formatPrice';

import style from './ProductPage.module.css';

interface ProductPageProps {
  product: Product;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const [isActive, setIsActive] = useState(0);

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
        {'>'}{' '}
        <a
          className={style.link}
          href={`/${product.catPath}`}
          onClick={(e) => {
            e.preventDefault();
            history.push({ pathname: `/${product.catPath}`, search: `?brand=${product.brand}` });
          }}
        >
          {product.brand}
        </a>{' '}
        {'>'} <span>{product.title}</span>
      </div>
      <h1>{product.title}</h1>
      <div className={style.infoWrapper}>
        <div className={style.images}>
          <div className={style.imagesArray}>
            {product.images.map((el, index) => {
              return (
                <div
                  key={el}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsActive(index);
                  }}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex={0}
                >
                  <img className={style.img} src={el} alt={product.title} key={el} />
                </div>
              );
            })}
          </div>
          <div className={style.fullImgWrapper}>
            {product.images.map((el, index) => {
              return (
                <img
                  className={classNames(style.fullImg, {
                    [style.active]: isActive === index,
                  })}
                  src={el}
                  alt={product.title}
                  key={el}
                />
              );
            })}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infoItems}>
            <div>
              Категория:{' '}
              <a
                className={style.link}
                href={`/${product.catPath}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({ pathname: `/${product.catPath}` });
                }}
              >
                {product.category}
              </a>
            </div>
            <div>
              Тип продукта:{' '}
              <a
                className={style.link}
                href={`/${product.catPath}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: `/${product.catPath}`,
                    search: `?product=${product.type}`,
                  });
                }}
              >
                {product.type}
              </a>
            </div>
            <div>
              Бренд:{' '}
              <a
                className={style.link}
                href={`/${product.catPath}`}
                onClick={(e) => {
                  e.preventDefault();
                  history.push({
                    pathname: `/${product.catPath}`,
                    search: `?brand=${product.brand}`,
                  });
                }}
              >
                {product.brand}
              </a>
            </div>
          </div>
          <div className={style.price}>{formatPrice(product.price)} BYN</div>
          <div>В наличии: {product.stock}</div>
          <button type="button" className={style.button}>
            В корзину
          </button>
          <button type="button" className={classNames(style.button, style.fastPurchaseButton)}>
            Купить в 1 клик
          </button>
        </div>
      </div>
      <div className={style.description}>{product.description}</div>
    </section>
  );
};
