import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { IAccount, IAccountPayload } from './types';
import { z } from 'zod';

export class Account extends CollectionItem implements IAccount {
  description: string;
  amount: number;
  monthBudget: number;

  constructor({ description, amount, monthBudget, ...args }: IAccountPayload) {
    super(args);

    this.amount = amount;
    this.monthBudget = monthBudget;
    this.description = description;
  }

  static inputTypes: InputTypes<IAccountPayload> = {
    ...CollectionItem.inputTypes,
    amount: 'currencyNumber',
    monthBudget: 'currencyNumber',
    description: 'textarea',
  };

  static inputValidation: InputValidations<IAccountPayload> = {
    ...CollectionItem.inputValidation,
    amount: z.number().finite().positive(),
    monthBudget: z.number().finite().positive(),
    description: z.string().optional(),
  };
}
