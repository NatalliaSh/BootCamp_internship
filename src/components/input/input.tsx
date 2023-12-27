import styles from './input.module.scss';
import {
  ReactElement,
  ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {HintButtonIcon} from '../icon-components/hint-button-icon';

type InputProps = {
  label: string;
  type: 'text' | 'number' | 'email' | 'password';
  maxLength: number;
  placeholder: string;
  name: string;
  hint?: string;
  children?: ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  autofocus?: boolean;
  errorMessage?: string;
  autoComplete?: string;
  isAfterError?: boolean;
  disabled?: boolean;
};

type Ref = {
  name: string | undefined;
  focus: () => void;
};

export const Input = forwardRef<Ref, InputProps>(
  (
    {
      label,
      type,
      maxLength,
      placeholder,
      name,
      hint,
      children,
      onChange,
      value = '',
      autofocus = false,
      errorMessage = '',
      autoComplete = 'off',
      isAfterError = false,
      disabled = false,
    },
    ref,
  ) => {
    const [isShowHint, setShowHint] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return {
        name: inputRef.current?.name,
        focus() {
          inputRef.current?.focus();
        },
      };
    });

    const classes = classNames(styles.field, {
      [styles.invalid]: errorMessage,
    });

    const error =
      errorMessage.split('\n').length > 1 ? (
        <ul>
          {errorMessage.split('\n').map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      ) : (
        errorMessage
      );

    useLayoutEffect(() => {
      if (errorMessage) {
        setShowHint(false);
      } else if (isAfterError) {
        setShowHint(true);
      }
    }, [errorMessage, isAfterError]);

    return (
      <label className={classes}>
        <p>{label}</p>
        <input
          ref={inputRef}
          name={name}
          type={type}
          autoFocus={autofocus}
          maxLength={maxLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          disabled={disabled}
        />
        {children}
        {errorMessage && <div className={styles.error}>{error}</div>}
        {hint && (
          <HintButtonIcon
            className={styles['hint-button']}
            onClick={() => {
              if (!errorMessage) {
                setShowHint((prev) => !prev);
              }
            }}
          />
        )}
        {hint && isShowHint && (
          <ul className={styles.hint}>
            {hint.split('\n').map((str, index) => (
              <li key={index}>{str}</li>
            ))}
          </ul>
        )}
      </label>
    );
  },
);

Input.displayName = 'Input';
