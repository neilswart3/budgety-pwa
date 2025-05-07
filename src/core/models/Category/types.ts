import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export interface ICategory extends ICollectionItem {
  description: string;
  color: string;
  icon: string;
}

export type ICategoryPayload = ICollectionItemPayload & ICategory;
