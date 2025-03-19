export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy: string;
}

export interface IBaseCategoryItem {
  name: string;
  description: string;
}

export type ICategoryItem = IBaseCollectionItem & IBaseCategoryItem;

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
