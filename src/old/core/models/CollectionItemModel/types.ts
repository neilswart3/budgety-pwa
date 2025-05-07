import { ICollectionInputType } from '../baseTypes';

export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy: string;
}

export type IBaseCollectionItemInput = Pick<IBaseCollectionItem, 'name'>;

export const baseCollectionItemFieldTypes: Record<
  keyof IBaseCollectionItemInput,
  ICollectionInputType
> = {
  name: 'text',
};

export type ICollectionItemModelPayload = IBaseCollectionItemInput &
  Partial<Pick<IBaseCollectionItem, 'id' | 'created' | 'createdBy'>>;
