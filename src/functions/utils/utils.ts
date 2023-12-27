import {InputDataType} from '../../types/input-data';

export const getNewInputData = (
  inputData: InputDataType[],
  inputIndex: number,
  newProperties: {errorMessage: string; value?: string; isAfterError?: boolean},
) => {
  const newArr = [...inputData];
  newArr[inputIndex] = {
    ...newArr[inputIndex],
    ...newProperties,
  };

  return newArr;
};
