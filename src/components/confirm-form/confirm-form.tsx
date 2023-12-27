import styles from './confirm-form.module.scss';
import {EmptyForm} from '../empty-form/empty-form';
import {SubmitButton} from '../submit-button/submit-button';
import {FC} from 'react';

type ConfirmFormProps = {
  onClose: () => void;
  onCancel: () => void;
};

export const ConfirmForm: FC<ConfirmFormProps> = ({onClose, onCancel}) => {
  return (
    <EmptyForm>
      <p className={styles.question}>
        Are you sure you want to close the window?
      </p>
      <p className={styles.warning}>All unsaved data will be lost</p>
      <div className={styles.buttons}>
        <SubmitButton
          text="Cancel"
          isSmall={true}
          isSecondary={true}
          onClick={onCancel}
        />
        <SubmitButton text="Close" isSmall={true} onClick={onClose} />
      </div>
    </EmptyForm>
  );
};
