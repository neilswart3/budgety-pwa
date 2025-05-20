import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

interface IBaseSavingPayload {
  description: string;
  amount: number;
  goalAmount: number;
  contributionMonthly?: number;
  goalDate?: Date;
  color: string;
  icon: string;
}

export type ISaving = ICollectionItem & IBaseSavingPayload;
export type ISavingPayload = IBaseSavingPayload & ICollectionItemPayload;
