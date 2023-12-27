import {TData, CellType} from '../types';
import {TableData} from '../../../types/table';

const getHeaderData = (data: TableData, isReadOnlyTable: boolean): TData => {
  const headerData = data.columns.reduce((acc: TData, col) => {
    acc[col.id] = {
      id: col.id,
      value: col.name,
      concurrencyStamp: col.concurrencyStamp,
      type: CellType.Column,
      isReadOnly: isReadOnlyTable || col.isReadOnlyName,
    };

    return acc;
  }, {});

  return headerData;
};

const getTableBodyData = (
  data: TableData,
  isReadOnlyTable: boolean,
): TData[] => {
  const tableBodyData = data.rows.map((row) => {
    const isReadOnlyFooter = row.name === 'Total';

    const rowTitle: TData = {
      [data.columns[0].id]: {
        id: row.id,
        value: row.name,
        concurrencyStamp: row.concurrencyStamp,
        type: CellType.Row,
        isReadOnly: isReadOnlyTable || isReadOnlyFooter,
      },
    };

    const rowData: TData = row.cells.reduce((acc, cell) => {
      acc[cell.columnId] = {
        id: cell.id,
        value: cell.value,
        concurrencyStamp: cell.concurrencyStamp,
        type: CellType.Cell,
        isReadOnly: isReadOnlyTable || isReadOnlyFooter,
      };

      return acc;
    }, rowTitle);

    return rowData;
  });

  return tableBodyData;
};

// The data represents the array of rows, where each row is an object with key = "column accessorKey (id)" and value: ValueType

export const createTableData = (
  data: TableData,
  isReadOnlyTable: boolean,
): TData[] => {
  //get header data and then put it in rows, because of the need to edit the column titles
  const headerData = getHeaderData(data, isReadOnlyTable);
  const tableBodyData = getTableBodyData(data, isReadOnlyTable);

  return [headerData, ...tableBodyData];
};
