import styles from './activity-pop-up.module.scss';
import {ReactNode, FC, useEffect} from 'react';

type ActivityPopUpProps = {
  children: ReactNode;
  id: string;
  onClose: () => void;
};

export const ActivityPopUp: FC<ActivityPopUpProps> = ({
  children,
  onClose,
  id,
}) => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const isPopupItemsClicked = e
        .composedPath()
        .find((el) => (el as HTMLElement).dataset?.targetId === id);

      if (!isPopupItemsClicked) {
        onClose();
      }
    };

    window.addEventListener('click', onClick, true);

    return () => window.removeEventListener('click', onClick, true);
  }, [onClose, id]);

  return <div className={styles['wrapper']}>{children}</div>;
};
