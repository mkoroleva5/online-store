import styles from './CatalogMenu.module.css';
import tableIcon from '../../assets/images/table.png';
import listIcon from '../../assets/images/list.png';
import { Layout } from '../types';

interface CatalogMenuProps {
  onLayoutChange: (val: Layout) => void;
}

export const CatalogMenu = ({ onLayoutChange }: CatalogMenuProps) => {
  return (
    <div className={styles.buttonsWrapper}>
      <button
        className={styles.displayButton}
        type="button"
        onClick={() => onLayoutChange('table')}
      >
        <img className={styles.displayIcon} src={tableIcon} alt="Table layout" />
      </button>
      <button className={styles.displayButton} type="button" onClick={() => onLayoutChange('list')}>
        <img className={styles.displayIcon} src={listIcon} alt="List layout" />
      </button>
    </div>
  );
};
