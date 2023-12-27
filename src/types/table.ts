export type TableData = {
  id: string;
  name: string;
  columns: Columns;
  rows: Rows;
};

export type TableFilter = {
  id: string;
  columnId: string;
  filterValue: string;
};

export type EditTableColumnOrRow = {
  id: string;
  name: string;
  concurrencyStamp: string;
};

export type EditTableCell = {
  id: string;
  value: string;
  concurrencyStamp: string;
};

export type EditTableResp = {
  objectType: string;
  objectId: string;
  propertyName: string;
  propertyValue: string;
  concurrencyStamp: string;
};

type Cells = {
  columnId: string;
  columnName: string;
  concurrencyStamp: string;
  id: string;
  rowId: string;
  rowName: string;
  value: string;
  valueType: string;
}[];

type Columns = {
  cells: Cells;
  columnOrder: number;
  concurrencyStamp: string;
  id: string;
  isExtraSortingCriterionForRows: boolean;
  isReadOnlyName: boolean;
  isUniqueCriterionForSimilarRows: boolean;
  name: string;
  tableId: string;
  tableName: string;
  valueType: string;
}[];

type Rows = {
  cells: Cells;
  concurrencyStamp: string;
  id: string;
  name: string;
  tableId: string;
  tableName: string;
}[];
