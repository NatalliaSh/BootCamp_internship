import {FC, ChangeEvent} from 'react';
import styles from './radio-input.module.scss';

type RadioInputProps = {
  label: string;
  name: string;
  value: string;
  isChecked: boolean;
  onChange: (eo: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioInput: FC<RadioInputProps> = ({
  label,
  name,
  value,
  isChecked,
  onChange,
}) => {
  return (
    <label className={styles['label-wrapper']}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={(eo) => onChange(eo)}
      />
      <span className={styles['label-text']}>{label}</span>
      <span className={styles['custom-radio']}></span>
    </label>
  );
};
