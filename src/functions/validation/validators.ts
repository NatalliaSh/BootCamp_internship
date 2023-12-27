import {ValidationFunctionType} from '../../types/validation-function';

export const checkEmptyFields = ({value}: ValidationFunctionType) => {
  if (value) {
    return '';
  }
  return 'Please field out this field';
};

export const checkFirstLastNameField = ({value}: ValidationFunctionType) => {
  const emptyMessage = checkEmptyFields({value});
  const regExp = /^[a-zA-Z-]{2,20}$/;

  if (emptyMessage) {
    return emptyMessage;
  }

  if (regExp.test(value)) {
    return '';
  } else {
    return 'Use 2-20 characters (uppercase and lowercase)\nCan contain -(hyphen)\nOnly the Latin alphabet';
  }
};

export const checkUserNameField = ({value}: ValidationFunctionType) => {
  const emptyMessage = checkEmptyFields({value});
  const regExp = /^[a-zA-Z0-9_\-.]{4,20}$/;

  if (emptyMessage) {
    return emptyMessage;
  }

  if (regExp.test(value)) {
    return '';
  } else {
    return 'Use 4-20 characters (uppercase, lowercase, numbers)\nSpecial characters:  _ (underscore),- (hyphen), . (dot)\nOnly the Latin alphabet';
  }
};

export const checkPasswordField = ({value}: ValidationFunctionType) => {
  const emptyMessage = checkEmptyFields({value});
  const regExp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[a-zA-Z0-9]{1}[a-zA-Z0-9!@#$%^&*]{6,28}[a-zA-Z0-9]{1}$/;

  if (emptyMessage) {
    return emptyMessage;
  }

  if (regExp.test(value)) {
    return '';
  } else {
    return "Use 8-30 characters (at least one uppercase letter, one lowercase letter and one number)\nSpecial characters !@#$%^&* (don't start or end with special characters)\nOnly the Latin alphabet";
  }
};

export const checkConfirmField = ({
  value,
  comparedValue,
}: ValidationFunctionType) => {
  const emptyMessage = checkEmptyFields({value});

  if (emptyMessage) {
    return emptyMessage;
  }

  if (value === comparedValue) {
    return '';
  } else {
    return "Passwords don't match";
  }
};
