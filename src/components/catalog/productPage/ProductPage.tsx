import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Product } from '../../../data/product';
import { history } from '../../../store/History';
import { formatPrice } from '../../../utils/formatPrice';
import { InCartButton } from '../../basic-components/InCartButton';
import { CartStateContext } from '../../cartState';
import style from './ProductPage.module.css';
import { ProductPageImage } from './ProductPageImage';
import chevronRight from '../../../assets/icons/chevron-right.svg';
import { Link } from '../../basic-components/Link';

interface ProductPageProps {
  product: Product;
}

export const ProductPage = ({ product }: ProductPageProps) => {
  const { cartState, dispatch } = useContext(CartStateContext);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <section className={style.wrapper}>
      <div className={style.breadCrumbs}>
        <Link className={style.link} href="/">
          Главная
        </Link>
        <img src={chevronRight} alt="arrow" className={style.chevron} />
        <Link className={style.link} href={`/${product.catPath}`}>
          {product.category}
        </Link>
        <img src={chevronRight} alt="arrow" className={style.chevron} />
        <Link className={style.link} href={`/${product.catPath}?brand=${product.brand}`}>
          {product.brand}
        </Link>
        <img src={chevronRight} alt="arrow" className={style.chevron} />
        <span>{product.title}</span>
      </div>
      <h1 className={style.title}>{product.title}</h1>
      <div className={style.infoWrapper}>
        <div className={style.images}>
          <div className={style.imagesArray}>
            {product.images.map((el, index) => {
              return (
                <button
                  key={el}
                  className={classNames(style.imageButton, {
                    [style.active]: activeImageIndex === index,
                  })}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveImageIndex(index);
                  }}
                >
                  <ProductPageImage key={el + 1} src={el} title={product.title} imageSize="img" />
                </button>
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
                  isActive={activeImageIndex}
                  src={el}
                  title={product.title}
                  index={index}
                  imageSize="fullImg"
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
                  isActive={activeImageIndex}
                  src={product.images[activeImageIndex]}
                  title={product.title}
                  imageSize="enlargedImg"
                />
              </div>
            </button>
          )}
        </div>
        <div className={style.info}>
          <div className={style.infoItems}>
            <div>
              Категория:{' '}
              <Link className={style.link} href={`/${product.catPath}`}>
                {product.category}
              </Link>
            </div>
            <div>
              Тип продукта:{' '}
              <Link className={style.link} href={`/${product.catPath}?product=${product.type}`}>
                {product.type}
              </Link>
            </div>
            <div>
              Бренд:{' '}
              <Link className={style.link} href={`/${product.catPath}?brand=${product.brand}`}>
                {product.brand}
              </Link>
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
