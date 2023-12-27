import {ValidationFunctionType} from './validation-function';

export type InputDataType = {
  name: string;
  label: string;
  value: string;
  maxLength: number;
  placeholder: string;
  errorMessage: string;
  hint: string;
  validationFn?: (validationProperties: ValidationFunctionType) => string;
  isAfterError: boolean;
  type?: 'text' | 'number' | 'email' | 'password';
  disabled?: boolean;
};
