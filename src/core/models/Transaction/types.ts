import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

interface IBaseTransactionPayload {
  type: TransactionType;
  amount: number;
  date: string;
  salaryMonth: string;
  category: string;
  subCategories: string[];
  accounts: string[];
  occasion: string;
  description: string;
  location?: string;
  vendor?: string;
}

export type ITransaction = ICollectionItem & IBaseTransactionPayload;
export type ITransactionPayload = IBaseTransactionPayload &
  ICollectionItemPayload;
