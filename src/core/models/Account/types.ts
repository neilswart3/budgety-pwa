import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export interface IAccount extends ICollectionItem {
  description: string;
  amount: number;
  monthBudget: number;
}

export type IAccountPayload = ICollectionItemPayload & IAccount;
