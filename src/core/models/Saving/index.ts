import { CollectionItem } from '../CollectionItem';
import { InputTypes } from '../CollectionItem/types';
import { ISaving, ISavingPayload } from './types';

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
    description: 'textarea',
    color: 'color',
    icon: 'select',
  };
}
