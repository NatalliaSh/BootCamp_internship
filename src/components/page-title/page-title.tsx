import {FC} from 'react';
import styles from './page-title.module.scss';

type PageTitleProps = {
  title: string;
};

export const PageTitle: FC<PageTitleProps> = ({title}) => (
  <h1 className={styles.title}>{title}</h1>
);
