import style from './CatalogMenu.module.css';
import tableIcon from '../../../assets/icons/grid.svg';
import listIcon from '../../../assets/icons/list.svg';
import { Layout } from '../types';
import arrow from '../../../assets/icons/arrow.svg';

interface CatalogMenuProps {
  onLayoutChange: (val: Layout) => void;
}

export const CatalogMenu = ({ onLayoutChange }: CatalogMenuProps) => {
  return (
    <div className={style.buttonsWrapper}>
      <div className={style.blockContainer}>
        <button type="button" className={style.sortBtn}>
          По алфавиту
          <img src={arrow} alt="arrow" className={style.arrow} />
        </button>
        <button type="button" className={style.sortBtn}>
          По цене
          <img src={arrow} alt="arrow" className={style.arrow} />
        </button>
      </div>
      <div className={style.blockContainer}>
        <button
          className={style.displayButton}
          type="button"
          onClick={() => onLayoutChange('table')}
        >
          <img className={style.displayIcon} src={tableIcon} alt="Table layout" />
        </button>
        <button
          className={style.displayButton}
          type="button"
          onClick={() => onLayoutChange('list')}
        >
          <img className={style.displayIcon} src={listIcon} alt="List layout" />
        </button>
      </div>
    </div>
  );
};
