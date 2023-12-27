import {TableFilter} from '../types/table';

export const API_URL = {
  updateUserPassword: '/user/credential',
  tableData: (id: string) => `/table/?id=${id}`,
  tableFilteredData: ({id, columnId, filterValue}: TableFilter) =>
    `/table/filter?id=${id}&columnId=${columnId}&filterValue=${filterValue}`,
  editTableColumn: '/table/column',
  editTableRow: '/table/row',
  editTableCell: '/table/cell',
};
