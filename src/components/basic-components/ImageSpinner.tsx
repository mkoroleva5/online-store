import classNames from 'classnames';
import style from './ImageSpinner.module.css';

interface ImageSpinnerProps {
  displayList?: boolean;
  sizeClass?: string;
  classN: string;
}

export const ImageSpinner = ({ displayList = true, sizeClass = '', classN }: ImageSpinnerProps) => {
  return (
    <div
      className={classNames(style.spinner, {
        [style.list]: displayList,
        [style.cardSpinner]: sizeClass === 'card-spinner',
        [style.layered]: classN === 'fullImg',
      })}
    />
  );
};
