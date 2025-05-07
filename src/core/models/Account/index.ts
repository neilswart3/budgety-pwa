import { CollectionItem } from '../CollectionItem';
import { InputTypes } from '../CollectionItem/types';
import { IAccount, IAccountPayload } from './types';

export class Account extends CollectionItem implements IAccount {
  description: string;
  amount: number;
  monthBudget: number;

  constructor({ description, amount, monthBudget, ...args }: IAccountPayload) {
    super(args);

    this.description = description;
    this.amount = amount;
    this.monthBudget = monthBudget;
  }

  static inputTypes: InputTypes<IAccountPayload> = {
    ...CollectionItem.inputTypes,
    description: 'textarea',
    amount: 'currencyNumber',
    monthBudget: 'currencyNumber',
  };
}
