import classNames from 'classnames';
import style from './ImageSpinner.module.css';

interface ImageSpinnerProps {
  displayList?: boolean;
}

export const ImageSpinner = ({ displayList = true }: ImageSpinnerProps) => {
  return <div className={classNames(style.spinner, { [style.list]: displayList })} />;
};
