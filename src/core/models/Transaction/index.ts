import { CollectionItem } from '../CollectionItem';
import { ITransaction, ITransactionPayload, TransactionType } from './types';
import { InputTypes } from '../CollectionItem/types';

export class Transaction extends CollectionItem implements ITransaction {
  type: TransactionType;
  amount: number;
  date: string;
  salaryMonth: string;
  categories: string[];
  accounts: string[];
  occasion: string;
  description: string;
  location?: string | undefined;
  vendor?: string | undefined;

  constructor({
    type,
    amount,
    date,
    salaryMonth,
    categories,
    accounts,
    occasion,
    description,
    location,
    vendor,
    ...args
  }: ITransactionPayload) {
    super(args);

    this.type = type;
    this.amount = amount;
    this.date = date;
    this.salaryMonth = salaryMonth;
    this.categories = categories;
    this.accounts = accounts;
    this.occasion = occasion;
    this.description = description;
    this.location = location;
    this.vendor = vendor;
  }

  static inputTypes: InputTypes<ITransactionPayload> = {
    ...CollectionItem.inputTypes,
    amount: 'currencyNumber',
    type: 'switch',
    date: 'datetime-local',
    salaryMonth: 'month',
    categories: 'multiSelect',
    accounts: 'multiSelect',
    occasion: 'select',
    description: 'textarea',
    location: 'text',
    vendor: 'text',
  };
}
