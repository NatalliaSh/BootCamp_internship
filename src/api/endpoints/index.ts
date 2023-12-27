import {editUserPassword} from './edit-user-password.api';
import {tableData} from './table';
import {editTableColumn} from './edit-table-column';
import {editTableRow} from './edit-table-row';
import {editTableCell} from './edit-table-cell';
import {tableFilteredData} from './table-filter';

export const {useEditUserPasswordMutation} = editUserPassword;

export const {useGetTableDataQuery, useLazyGetTableDataQuery} = tableData;

export const {useGetTableFilteredDataQuery, useLazyGetTableFilteredDataQuery} =
  tableFilteredData;

export const {useEditTableColumnMutation} = editTableColumn;

export const {useEditTableRowMutation} = editTableRow;

export const {useEditTableCellMutation} = editTableCell;