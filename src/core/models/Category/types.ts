import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

interface IBaseCategoryPayload {
  description: string;
  color: string;
  icon: string;
  subCategories?: string[];
}

export type ICategory = ICollectionItem & IBaseCategoryPayload;
export type ICategoryPayload = IBaseCategoryPayload & ICollectionItemPayload;
