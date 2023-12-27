import classNames from 'classnames';
import {FC} from 'react';
import {ReactComponent as Spinner} from '../../img/icons/spinner.svg';
import styles from './submit-button.module.scss';

type SubmitButtonProps = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  isSmall?: boolean;
  isSecondary?: boolean;
  isExtraSmall?: boolean;
  isSmallSlim?: boolean;
  isDisabled?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  text,
  onClick,
  isLoading,
  type = 'button',
  isSmall = false,
  isSecondary = false,
  isSmallSlim = false,
  isExtraSmall = false,
  isDisabled = false,
}) => {
  const btnClass = classNames(styles.button, {
    [styles.button_secondary]: isSecondary,
    [styles.button_small]: isSmall,
    [styles['button_small-slim']]: isSmallSlim,
    [styles['button-extra-small']]: isExtraSmall,
  });
  return (
    <button
      className={btnClass}
      type={type}
      onClick={(e) => onClick(e)}
      disabled={isDisabled}
    >
      <span>{isLoading ? <Spinner /> : text}</span>
    </button>
  );
};
