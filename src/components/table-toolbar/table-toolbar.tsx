import styles from './table-toolbar.module.scss';
import {FC, ReactElement} from 'react';

type TableToolbarProps = {
  children?: ReactElement;
};

export const TableToolbar: FC<TableToolbarProps> = ({children}) => (
  <div className={styles.wrapper}>{children}</div>
);
