const ERROR_MESSAGE = 'Incorrect data. Please try again';
const EMPTY_MESSAGE = '';
const CHECK_ONE_LETTER_TITLE = /^[A-Za-z0-9]$/;
const CHECK_COLUMN_OR_ROW = /^[A-Za-z0-9][A-Za-z0-9-_./\s]{0,24}[A-Za-z0-9]$/;
const CHECK_CELL = /^[0-9]{0,9}$/;

export const checkColumnOrRowTitle = (value: string) => {
  const isValid =
    value.length === 1
      ? CHECK_ONE_LETTER_TITLE.test(value)
      : CHECK_COLUMN_OR_ROW.test(value);

  return isValid ? EMPTY_MESSAGE : ERROR_MESSAGE;
};

export const checkCell = (value: string) => {
  if (CHECK_CELL.test(value)) {
    return EMPTY_MESSAGE;
  } else {
    return ERROR_MESSAGE;
  }
};
