export const enum CellType {
  Column,
  Row,
  Cell,
}

export type ValueType = {
  id: string;
  value: string;
  concurrencyStamp: string;
  type: CellType;
  isReadOnly: boolean;
};

export type TData = {
  [accessorKey: string]: ValueType;
};
