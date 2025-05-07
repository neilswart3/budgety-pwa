import { HTMLInputTypeAttribute } from 'react';

export interface ICollectionItem {
  id: string;
  name: string;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  modifiedBy: string;
}

export type ICollectionItemPayload = Pick<ICollectionItem, 'name'> &
  Partial<Omit<ICollectionItem, 'name'>>;

export type InputTypesValues =
  | Extract<
      HTMLInputTypeAttribute,
      | 'text'
      | 'number'
      | 'color'
      | 'date'
      | 'datetime-local'
      | 'month'
      | 'time'
      | 'email'
      | 'file'
    >
  | 'currencyNumber'
  | 'textarea'
  | 'select'
  | 'multiSelect'
  | 'switch';

export type InputTypes<T> = Record<
  keyof Omit<T, keyof Omit<ICollectionItem, 'name'>>,
  InputTypesValues
>;
