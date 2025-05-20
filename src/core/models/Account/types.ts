import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

interface IBaseAccountPayload {
  description: string;
  amount: number;
  monthBudget: number;
}

export type IAccount = ICollectionItem & IBaseAccountPayload;
export type IAccountPayload = IBaseAccountPayload & ICollectionItemPayload;
