import styles from './editable-cell.module.scss';
import {useState, FC, ChangeEvent, useEffect} from 'react';
import {CellType, TData} from './types';
import classNames from 'classnames';
import {ValueType} from './types';
import {Row, Column, Table} from '@tanstack/react-table';
import {
  checkColumnOrRowTitle,
  checkCell,
} from '../../functions/validation/table-validators';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';
import {useAppDispatch} from '../../store/hooks/redux-hooks';
import {
  useEditTableColumnMutation,
  useEditTableRowMutation,
  useEditTableCellMutation,
} from '../../api/endpoints';
import {customHistory} from '../../routes/customRouter/history';

type Props = {
  getValue: () => ValueType;
  row: Row<TData>;
  column: Column<TData>;
  table: Table<TData>;
};

export const EditableCell: FC<Props> = ({getValue, row, column, table}) => {
  const cellData = getValue();

  const [value, setValue] = useState(cellData.value ? cellData.value : '');
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  // here we check the length of value in order to center text inside the textarea by padding changing
  const [isMoreThenOneRow, setIsMoreThenOneRow] = useState(
    cellData.value && cellData.type === CellType.Column
      ? cellData.value.length > 13
      : cellData.value
      ? cellData.value.length > 22
      : false,
  );

  const [saveColumnDataTrigger, {isLoading: isEditColumnLoad}] =
    useEditTableColumnMutation();
  const [saveRowDataTrigger, {isLoading: isEditRowLoad}] =
    useEditTableRowMutation();
  const [saveCellDataTrigger, {isLoading: isEditCellLoad}] =
    useEditTableCellMutation();

  const onChange = (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    setIsMoreThenOneRow(
      cellData.type === CellType.Column
        ? e.target.value.length > 15
        : e.target.value.length > 21,
    );
    setValue(e.target.value);
    setIsError(false);
  };

  const onBlur = async () => {
    // check if the field is textarea and change "\n" to space in order to validation would be passed
    const currentValue =
      cellData.type === CellType.Cell ? value : value.split('\n').join(' ');

    if (!cellData.isReadOnly && cellData.value !== currentValue) {
      // VALIDATION
      const errorMessage =
        cellData.type === CellType.Cell
          ? checkCell(currentValue)
          : checkColumnOrRowTitle(currentValue);

      if (errorMessage) {
        setIsError(true);
        dispatch(
          toastsActions.showToast({
            type: ToastType.Error,
            message: errorMessage,
          }),
        );
        return;
      }

      // VALIDATION PASSED
      try {
        const rowColumnData = {
          id: cellData.id,
          name: currentValue,
          concurrencyStamp: cellData.concurrencyStamp,
        };

        let data;
        switch (cellData.type) {
          case CellType.Column:
            data = await saveColumnDataTrigger(rowColumnData).unwrap();
            break;
          case CellType.Row:
            data = await saveRowDataTrigger(rowColumnData).unwrap();
            break;
          default:
            data = await saveCellDataTrigger({
              id: cellData.id,
              value: currentValue,
              concurrencyStamp: cellData.concurrencyStamp,
            }).unwrap();
        }

        table.options.meta?.updateData(row.index, column.id, {
          ...cellData,
          value: data.propertyValue,
          concurrencyStamp: data.concurrencyStamp,
        });
      } catch (e) {
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    const unblock = customHistory.block((tx) => {
      if (isEditCellLoad || isEditColumnLoad || isEditRowLoad) {
        if (
          window.confirm(
            'Are you sure you want to exit the editing mode?\nAll unsaved data will be lost',
          )
        ) {
          unblock();
          tx.retry();
        }
      }
    });

    if (!isEditCellLoad && !isEditColumnLoad && !isEditRowLoad) {
      unblock();
    }

    return () => unblock();
  }, [isEditColumnLoad, isEditRowLoad, isEditCellLoad]);

  const classes = classNames(styles.field, {
    [styles.editable]: !cellData.isReadOnly,
    [styles.header]: cellData.type === CellType.Column,
    [styles.invalid]: isError,
    [styles.big]: isMoreThenOneRow,
  });

  return cellData.type === CellType.Cell ? (
    <input
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      onBlur={onBlur}
      readOnly={cellData.isReadOnly}
      className={classes}
      maxLength={9}
    />
  ) : (
    <textarea
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
      onBlur={onBlur}
      readOnly={cellData.isReadOnly}
      className={classes}
      maxLength={26}
    />
  );
};
