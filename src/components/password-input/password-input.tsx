import {useState, ChangeEvent, forwardRef} from 'react';
import {Input} from '../input';
import EyeClose from '../icon-components/eye-close';
import EyeOpen from '../icon-components/eye-open';
import styles from './password-input.module.scss';

type PasswordInputProps = {
  maxLength: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  autofocus?: boolean;
  hint?: string;
  errorMessage?: string;
  autoComplete?: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      maxLength,
      onChange,
      name,
      value = '',
      autofocus = false,
      hint = '',
      errorMessage = '',
      autoComplete = 'off',
    },
    ref,
  ) => {
    const [isHidden, setHidden] = useState(true);

    return (
      <div className={styles.wrapper}>
        <Input
          ref={ref}
          name={name}
          label="Password"
          type={isHidden ? 'password' : 'text'}
          value={value}
          autofocus={autofocus}
          maxLength={maxLength}
          placeholder="Please enter your password"
          hint={hint}
          errorMessage={errorMessage}
          autoComplete={autoComplete}
          onChange={onChange}
        >
          <div
            className={styles['icon-wrapper']}
            onClick={() => setHidden(!isHidden)}
          >
            {isHidden && <EyeClose />}
            {!isHidden && <EyeOpen />}
          </div>
        </Input>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
