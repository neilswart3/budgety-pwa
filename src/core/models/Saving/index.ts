import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { ISaving, ISavingPayload } from './types';
import { z } from 'zod';

export class Saving extends CollectionItem implements ISaving {
  description: string;
  amount: number;
  contributionMonthly: number | undefined;
  goalAmount: number;
  goalDate: Date | undefined;
  color: string;
  icon: string;

  constructor({
    description,
    goalAmount,
    goalDate,
    color,
    icon,
    amount,
    contributionMonthly,
    ...args
  }: ISavingPayload) {
    super(args);

    this.amount = amount;
    this.contributionMonthly = contributionMonthly;
    this.description = description;
    this.goalAmount = goalAmount;
    this.goalDate = goalDate;
    this.color = color;
    this.icon = icon;
  }

  static inputTypes: InputTypes<ISavingPayload> = {
    ...CollectionItem.inputTypes,
    amount: 'currencyNumber',
    goalAmount: 'currencyNumber',
    contributionMonthly: 'number',
    goalDate: 'date',
    color: 'color',
    icon: 'select',
    description: 'textarea',
  };

  static inputValidation: InputValidations<ISavingPayload> = {
    ...CollectionItem.inputValidation,
    amount: z.number().finite().positive(),
    contributionMonthly: z.number().finite().positive(),
    goalAmount: z.number().finite().positive(),
    goalDate: z.date().min(new Date()),
    color: z.string(),
    icon: z.string(),
    description: z.string().optional(),
  };
}
