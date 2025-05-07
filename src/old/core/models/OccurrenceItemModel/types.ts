import { IBaseModelPayload } from '../baseTypes';
import { IBaseCollectionItem } from '../CollectionItemModel/types';

export interface IBaseOccurrenceItem {
  description: string;
}

export type IOccurrenceItemModelPayload =
  IBaseModelPayload<IBaseOccurrenceItem>;

export type IOccurrenceItem = IBaseOccurrenceItem & IBaseCollectionItem;
