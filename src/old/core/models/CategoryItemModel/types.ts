// import { ThemeIcon } from '@/theme';
import { IBaseCollectionItem } from '../CollectionItemModel/types';
import { IBaseModelPayload } from '../baseTypes';

export interface IBaseCategoryItem {
  description: string;
  //   icon: ThemeIcon;
  icon: string;
  color: string;
}

export type ICategoryItemModelPayload = IBaseModelPayload<IBaseCategoryItem>;

export type ICategoryItem = IBaseCollectionItem & IBaseCategoryItem;
