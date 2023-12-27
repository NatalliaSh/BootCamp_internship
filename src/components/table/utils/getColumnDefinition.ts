import {TableData} from '../../../types/table';
import {EditableCell} from '../editable-cell';

export const getColumnDefinition = (data: TableData) =>
  data.columns.map((col) => ({
    accessorKey: col.id,
    cell: EditableCell,
  }));
