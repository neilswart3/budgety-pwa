import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { ISaving, ISavingPayload } from './types';
import { z } from 'zod';

export class Saving extends CollectionItem implements ISaving {
  description: string;
  goalAmount: number;
  goalDate: number;
  color: string;
  icon: string;

  constructor({
    description,
    goalAmount,
    goalDate,
    color,
    icon,
    ...args
  }: ISavingPayload) {
    super(args);

    this.description = description;
    this.goalAmount = goalAmount;
    this.goalDate = goalDate;
    this.color = color;
    this.icon = icon;
  }

  static inputTypes: InputTypes<ISavingPayload> = {
    ...CollectionItem.inputTypes,
    goalAmount: 'currencyNumber',
    goalDate: 'date',
    color: 'color',
    icon: 'select',
    description: 'textarea',
  };

  static inputValidation: InputValidations<ISavingPayload> = {
    ...CollectionItem.inputValidation,
    goalAmount: z.number().finite().positive(),
    goalDate: z.date().min(new Date()),
    color: z.string(),
    icon: z.string(),
    description: z.string().optional(),
  };
}
