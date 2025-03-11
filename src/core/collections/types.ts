export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
}

export type ITransactionItemType = 'income' | 'expense';

export interface ITransactionItem {
  name: string;
  description: string;
  type: ITransactionItemType;
  amount: number;
  user: string;
  category: string;
  source: string;
  location: string;
  date: Date;
  salaryMonth: Date;
}

export interface ITransaction extends IBaseCollectionItem, ITransactionItem {
  createdBy: string;
}

export type ICollection = ITransaction;
