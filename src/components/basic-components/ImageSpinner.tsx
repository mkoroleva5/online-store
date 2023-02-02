import classNames from 'classnames';
import style from './ImageSpinner.module.css';

interface ImageSpinnerProps {
  displayList?: boolean;
  small?: boolean;
  layered?: boolean;
}

export const ImageSpinner = ({ displayList = true, small, layered }: ImageSpinnerProps) => {
  return (
    <div
      className={classNames(style.spinner, {
        [style.list]: displayList,
        [style.cardSpinnerSmall]: small,
        [style.layered]: layered,
      })}
    />
  );
};
