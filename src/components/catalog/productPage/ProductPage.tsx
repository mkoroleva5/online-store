import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Product } from '../../../data/product';
import { history } from '../../../store/History';
import { formatPrice } from '../../../utils/formatPrice';
import { InCartButton } from '../../basic-components/InCartButton';
import { CartState } from '../../cartState';
import style from './ProductPage.module.css';
import { ProductPageImage } from './ProductPageImage';
import chevronRight from '../../../assets/icons/chevron-right.svg';

interface ProductPageProps {
  product: Product;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const { cartState, dispatch } = useContext(CartState);
  const [isActive, setIsActive] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

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
        <img src={chevronRight} alt="arrow" className={style.chevron} />
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
        <img src={chevronRight} alt="arrow" className={style.chevron} />
        <a
          className={style.link}
          href={`/${product.catPath}`}
          onClick={(e) => {
            e.preventDefault();
            history.push({ pathname: `/${product.catPath}`, search: `?brand=${product.brand}` });
          }}
        >
          {product.brand}
        </a>
        <img src={chevronRight} alt="arrow" className={style.chevron} />
        <span>{product.title}</span>
      </div>
      <h1 className={style.title}>{product.title}</h1>
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
                  <ProductPageImage key={el + 1} src={el} title={product.title} classN="img" />
                </div>
              );
            })}
          </div>
          <div
            className={style.fullImgWrapper}
            onClick={() => setIsEnlarged(true)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            {product.images.map((el, index) => {
              return (
                <ProductPageImage
                  key={el}
                  isActive={isActive}
                  src={el}
                  title={product.title}
                  index={index}
                  classN="fullImg"
                />
              );
            })}
          </div>
          {isEnlarged && (
            <button
              className={style.enlargedImageWrapper}
              type="button"
              onClick={(e) => {
                if (e.currentTarget === e.target) setIsEnlarged(false);
              }}
            >
              <div className={style.enlargedImgContainer}>
                <ProductPageImage
                  isActive={isActive}
                  src={product.images[isActive]}
                  title={product.title}
                  classN="enlargedImg"
                />
              </div>
            </button>
          )}
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
          <InCartButton key={product.id} product={product} />
          <button
            type="button"
            className={classNames(style.button, style.fastPurchaseButton)}
            onClick={(e) => {
              e.preventDefault();
              if (!cartState.products[product.id]) {
                dispatch({ type: 'ADD_PRODUCT', payload: product });
              }
              dispatch({ type: 'SET_CHECKOUT', payload: true });
              history.push('/cart');
            }}
          >
            Купить в 1 клик
          </button>
        </div>
      </div>
      {product.description.split('\n').map((el) => {
        return (
          <p key={el} className={style.description}>
            {el}
          </p>
        );
      })}
    </section>
  );
};
