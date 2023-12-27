import {InputDataType} from '../types/input-data';
import {useState, useRef, ChangeEvent} from 'react';
import {getNewInputData} from '../functions/utils/utils';
import {Input} from '../components/input';
import {PasswordInput} from '../components/password-input';

type BackendValidationErrors = {
  title: string[];
  lastName: string[];
  password: string[];
  userName: string[];
  firstName: string[];
  email: string[];
};

type KeyOfErrors =
  | 'lastName'
  | 'password'
  | 'userName'
  | 'firstName'
  | 'email'
  | 'title';

export function useInputs(
  inputs: InputDataType[],
  onChangeInputAdditionally?: () => void,
) {
  const [inputData, setInputData] = useState(inputs);
  const refsArr = useRef<HTMLInputElement[]>([]);

  const changeInputHandler = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setInputData((prev) => {
      return getNewInputData(prev, index, {
        value: e.target.value,
        errorMessage: '',
      });
    });

    // this callback is used to reset the server error display in the login form
    if (onChangeInputAdditionally) {
      onChangeInputAdditionally();
    }
  };

  const validate = (comparedValue?: string) => {
    const newArr = inputData.map((data) => {
      const error =
        !data.disabled && data.validationFn
          ? data.validationFn({value: data.value, comparedValue})
          : '';
      return error ? {...data, errorMessage: error, isAfterError: true} : data;
    });
    const indexOfFocus = newArr.findIndex((data) => data.errorMessage);

    if (indexOfFocus >= 0) {
      setInputData(newArr);
      refsArr.current[indexOfFocus].focus();
      return 'Validation error';
    }
  };

  const focusInput = (inputName: string) => {
    const index = refsArr.current.findIndex(
      (input) => input.name === inputName,
    );

    refsArr.current[index].focus();
  };

  const validateApiErrors = (errors: BackendValidationErrors) => {
    const newArr = [...inputData];
    Object.keys(errors).forEach((key) => {
      const index = inputData.findIndex((el) => el.name === key);
      if (index === -1) {
        return;
      }
      newArr[index] = {
        ...newArr[index],
        errorMessage: errors[key as KeyOfErrors][0],
        isAfterError: true,
      };
    });
    const indexOfFocus = newArr.findIndex((data) => data.errorMessage);

    if (indexOfFocus >= 0) {
      setInputData(newArr);
      refsArr.current[indexOfFocus].focus();
    }
  };

  const inputsLayout = inputData.map((el, index) => {
    if (el.type === 'password') {
      return (
        <PasswordInput
          key={index}
          ref={(el: HTMLInputElement) => (refsArr.current[index] = el)}
          name={el.name}
          value={el.value}
          maxLength={el.maxLength}
          errorMessage={el.errorMessage}
          onChange={(e) => changeInputHandler(e, index)}
        />
      );
    }

    return (
      <Input
        key={index}
        ref={(el: HTMLInputElement) => (refsArr.current[index] = el)}
        name={el.name}
        label={el.label}
        value={el.value}
        type={el.type ? el.type : 'text'}
        maxLength={el.maxLength}
        placeholder={el.placeholder}
        autofocus={index === 0}
        errorMessage={el.errorMessage}
        onChange={(e) => changeInputHandler(e, index)}
        hint={el.hint}
        isAfterError={el.isAfterError}
        disabled={el.disabled}
      />
    );
  });

  return {
    inputData,
    inputsLayout,
    setInputData,
    validate,
    focusInput,
    validateApiErrors,
  };
}
