import { useState } from 'react';
import classNames from 'classnames';
import style from './ProductPageImage.module.css';
import { ImageSpinner } from '../../basic-components/ImageSpinner';

interface ProductPageImageProps {
  isActive?: number;
  src: string;
  title: string;
  index?: number;
  classN: 'fullImg' | 'img' | 'enlargedImg';
}

export const ProductPageImage = ({
  src,
  title,
  classN,
  index,
  isActive,
}: ProductPageImageProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <>
      <img
        className={classNames(style[classN], {
          [style.active]: isActive === index,
          [style.loadedImg]: isImageLoaded,
        })}
        src={src}
        alt={title}
        onLoad={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.complete) setIsImageLoaded(true);
          else setIsImageLoaded(false);
        }}
      />
      {!isImageLoaded && <ImageSpinner layered displayList={false} />}
    </>
  );
};
