import {
  ICollectionItem,
  ICollectionItemPayload,
} from '../CollectionItem/types';

interface IBaseOccasionPayload {
  description: string;
  categories: string[];
  complete: boolean;
}

export type IOccasion = ICollectionItem & IBaseOccasionPayload;
export type IOccasionPayload = IBaseOccasionPayload & ICollectionItemPayload;
