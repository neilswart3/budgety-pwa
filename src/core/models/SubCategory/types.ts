import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

interface IBaseSubCategoryPayload {
  description: string;
  //   color: string;
  icon: string;
  category: string;
}

export type ISubCategory = ICollectionItem & IBaseSubCategoryPayload;
export type ISubCategoryPayload = IBaseSubCategoryPayload &
  ICollectionItemPayload;
