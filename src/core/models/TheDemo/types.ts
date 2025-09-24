import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

type IBaseTheDemoPayload = object;

export type ITheDemo = ICollectionItem & IBaseTheDemoPayload;
export type ITheDemoPayload = IBaseTheDemoPayload & ICollectionItemPayload;
