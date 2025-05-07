import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface ITransaction extends ICollectionItem {
  type: TransactionType;
  amount: number;
  date: string;
  salaryMonth: string;
  categories: string[];
  accounts: string[];
  occasion: string;
  description: string;
  location?: string;
  vendor?: string;
}

export type ITransactionPayload = ICollectionItemPayload & ITransaction;
