import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export interface ISaving extends ICollectionItem {
  description: string;
  goalAmount: number;
  goalDate: number;
  color: string;
  icon: string;
}

export type ISavingPayload = ICollectionItemPayload & ISaving;
