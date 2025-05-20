import { HTMLInputTypeAttribute } from 'react';
import { z } from 'zod';
import { TransactionType } from '../Transaction/types';

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
  | 'switch'
  | 'enum';

export type InputTypes<T> = Record<
  keyof Omit<T, keyof Omit<ICollectionItem, 'name'>>,
  InputTypesValues
>;

export type InputValidationsValues =
  | z.ZodString
  | z.ZodNumber
  | z.ZodDate
  | z.ZodEnum<[TransactionType.INCOME, TransactionType.EXPENSE]>
  | z.ZodArray<z.ZodString>
  | z.ZodBoolean
  | z.ZodOptional<InputValidationsValues>;

export type InputValidations<T> = Record<
  keyof InputTypes<T>,
  InputValidationsValues
>;
