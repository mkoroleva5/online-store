import { useContext } from 'react';
import classNames from 'classnames';
import style from './CatalogMenu.module.css';
import tableIcon from '../../../assets/icons/grid.svg';
import listIcon from '../../../assets/icons/list.svg';
import arrow from '../../../assets/icons/arrow.svg';
import { FilterState } from '../filterState';
import { updateSearchValue } from '../../../utils/searchHelpers';

export const CatalogMenu = () => {
  const { display, sort } = useContext(FilterState);
  return (
    <div className={style.buttonsWrapper}>
      <div className={style.blockContainer}>
        <button
          type="button"
          className={classNames(style.sortBtn, {
            [style.sortBtnActive]: sort === 'namedown' || sort === 'nameup',
          })}
          onClick={() => {
            updateSearchValue('sort', sort === 'nameup' ? 'namedown' : 'nameup');
          }}
        >
          По названию
          <img
            src={arrow}
            alt="arrow"
            className={classNames(style.arrow, {
              [style.arrowDown]: sort === 'namedown',
              [style.arrowVisible]: sort === 'namedown' || sort === 'nameup',
            })}
          />
        </button>
        <button
          type="button"
          className={classNames(style.sortBtn, {
            [style.sortBtnActive]: sort === 'pricedown' || sort === 'priceup',
          })}
          onClick={() => {
            updateSearchValue('sort', sort === 'priceup' ? 'pricedown' : 'priceup');
          }}
        >
          По цене
          <img
            src={arrow}
            alt="arrow"
            className={classNames(style.arrow, {
              [style.arrowDown]: sort === 'pricedown',
              [style.arrowVisible]: sort === 'pricedown' || sort === 'priceup',
            })}
          />
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
            className={`${style.displayIcon} ${display === 'table' ? style.active : ''}`}
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
            className={`${style.displayIcon} ${display === 'list' ? style.active : ''}`}
            src={listIcon}
            alt="List layout"
          />
        </button>
      </div>
    </div>
  );
};
