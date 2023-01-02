import classNames from 'classnames';
import style from './ImageSpinner.module.css';

interface ImageSpinnerProps {
  displayList?: boolean;
  sizeClass?: string;
}

export const ImageSpinner = ({ displayList = true, sizeClass = '' }: ImageSpinnerProps) => {
  return (
    <div
      className={classNames(style.spinner, {
        [style.list]: displayList,
        [style.cardSpinner]: sizeClass === 'card-spinner',
      })}
    />
  );
};
