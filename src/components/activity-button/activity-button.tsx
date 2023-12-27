import styles from './activity-button.module.scss';
import {FC} from 'react';
import {MouseEvent} from 'react';

type Props = {
  onClick: (
    id: string,
    e?: MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  id: string;
  isDisabled?: boolean;
};

export const ActivityButton: FC<Props> = ({
  onClick,
  id,
  isDisabled = false,
}) => (
  <button
    className={styles['user-menu']}
    type="button"
    onClick={(e) => {
      onClick(id, e);
    }}
    disabled={isDisabled}
    data-target-id={id}
  ></button>
);
