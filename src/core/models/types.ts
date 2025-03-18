export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy: string;
}

export enum TransactionItemTypeField {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface IBaseTransactionItem {
  name: string;
  description: string;
  type: TransactionItemTypeField;
  amount: number;
  user: string;
  category: string;
  source: string;
  location: string;
  date: Date;
  salaryMonth: Date;
}

export type ITransactionItem = IBaseCollectionItem & IBaseTransactionItem;
