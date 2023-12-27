import styles from './table.module.scss';
import {FC, useState} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import {ValueType} from './types';
import {createTableData} from './utils/createTableData';
import {TableData} from '../../types/table';
import {getColumnDefinition} from './utils/getColumnDefinition';
import classNames from 'classnames';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends unknown> {
    updateData: (rowIndex: number, columnId: string, value: ValueType) => void;
  }
}

type Props = {
  data: TableData;
  isReadOnlyTable: boolean;
  withFooter?: boolean;
};

export const Table: FC<Props> = ({
  data,
  isReadOnlyTable,
  withFooter = false,
}) => {
  const [tableData, setTableData] = useState(
    createTableData(data, isReadOnlyTable),
  );

  const table = useReactTable({
    data: tableData,
    columns: getColumnDefinition(data),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: ValueType) => {
        setTableData((prev) =>
          prev.map((row, index) => {
            return index === rowIndex
              ? {...prev[rowIndex], [columnId]: value}
              : row;
          }),
        );
      },
    },
  });

  const lastRow = table.getRowModel().rows.length - 1;

  // We don't return <thead> and return table header as a first row, because of the need to edit the column titles
  return (
    <table className={styles.wrapper}>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={classNames({
              [styles.footer]: withFooter && index === lastRow,
            })}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
