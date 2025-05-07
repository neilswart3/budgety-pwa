import { IBaseModelPayload, ICollectionInputType } from '../baseTypes';
import {
  IBaseCollectionItem,
  IBaseCollectionItemInput,
} from '../CollectionItemModel/types';

export enum TransactionItemTypeField {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface IBaseTransactionItem {
  description: string;
  type: TransactionItemTypeField;
  amount: number;
  user: string;
  category: string;
  account: string;
  occurrence: string;
  location: string;
  date: Date;
  salaryMonth: Date;
}

export type IBaseTransactionItemInputTypes = Record<
  keyof (IBaseCollectionItemInput & IBaseTransactionItem),
  ICollectionInputType
>;

export type ITransactionItemModelPayload =
  IBaseModelPayload<IBaseTransactionItem>;

export type ITransactionItem = IBaseCollectionItem & IBaseTransactionItem;
