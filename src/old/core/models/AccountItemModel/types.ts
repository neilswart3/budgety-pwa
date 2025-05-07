import { IBaseModelPayload, ICollectionFieldType } from '../baseTypes';
import {
  IBaseCollectionItem,
  IBaseCollectionItemInput,
} from '../CollectionItemModel/types';

export interface IBaseAccountItem {
  description: string;
  monthBudgetAmount: number;
}

export type IBaseAcountItemInputTypes = Record<
  keyof (IBaseCollectionItemInput & IBaseAccountItem),
  ICollectionFieldType
>;

export type IAccountItemModelPayload = IBaseModelPayload<IBaseAccountItem>;

export type IAccountItem = IBaseCollectionItem & IBaseAccountItem;
