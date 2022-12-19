import { useContext } from 'react';
import style from './CatalogMenu.module.css';
import tableIcon from '../../../assets/icons/grid.svg';
import listIcon from '../../../assets/icons/list.svg';
import arrow from '../../../assets/icons/arrow.svg';
import { FilterState } from '../filterState';
import { updateSearchValue } from '../../../utils/searchHelpers';

export const CatalogMenu = () => {
  const filterState = useContext(FilterState);
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
          onClick={() => {
            updateSearchValue('display', 'table');
          }}
        >
          <img
            className={`${style.displayIcon} ${
              filterState.display === 'table' ? style.active : ''
            }`}
            style={{ width: '1.8rem' }}
            src={tableIcon}
            alt="Table layout"
          />
        </button>
        <button
          className={style.displayButton}
          type="button"
          onClick={() => {
            updateSearchValue('display', 'list');
          }}
        >
          <img
            className={`${style.displayIcon} ${filterState.display === 'list' ? style.active : ''}`}
            src={listIcon}
            alt="List layout"
          />
        </button>
      </div>
    </div>
  );
};
