import { IBaseAccountItem } from './AccountItemModel/types';
import { IBaseCategoryItem } from './CategoryItemModel/types';
import { IBaseCollectionItem } from './CollectionItemModel/types';
import { IBaseOccurrenceItem } from './OccurrenceItemModel/types';
import { IBaseTransactionItem } from './TransactionItemModel/types';

type IBaseItems =
  | IBaseTransactionItem
  | IBaseAccountItem
  | IBaseCategoryItem
  | IBaseOccurrenceItem;

export type IBaseModelPayload<
  T extends IBaseItems = IBaseItems,
  B extends IBaseCollectionItem = IBaseCollectionItem,
  Required extends keyof B = 'name',
  Optional extends keyof B = 'id' | 'created' | 'createdBy'
> = T & Pick<B, Required> & Partial<Pick<B, Optional>>;

export type ICollectionInputType =
  | 'text'
  | 'textarea'
  | 'date'
  | 'number'
  | 'enum'
  | 'select'
  | 'datePicker'
  | 'monthYearPicker';
