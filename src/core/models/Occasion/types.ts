import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

export interface IOccasion extends ICollectionItem {
  description: string;
  categories: string[];
}

export type IOccasionPayload = ICollectionItemPayload & IOccasion;
