import { CollectionItem } from '../CollectionItem';
import { ITransaction, ITransactionPayload, TransactionType } from './types';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { z } from 'zod';

export class Transaction extends CollectionItem implements ITransaction {
  type: TransactionType;
  amount: number;
  date: string;
  salaryMonth: string;
  categories: string[];
  subCategories: string[];
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
    subCategories,
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
    this.subCategories = subCategories;
    this.accounts = accounts;
    this.occasion = occasion;
    this.location = location;
    this.vendor = vendor;
    this.description = description;
  }

  static inputTypes: InputTypes<ITransactionPayload> = {
    ...CollectionItem.inputTypes,
    type: 'enum',
    amount: 'currencyNumber',
    date: 'date',
    salaryMonth: 'month',
    categories: 'multiSelect',
    subCategories: 'multiSelect',
    accounts: 'multiSelect',
    occasion: 'select',
    location: 'text',
    vendor: 'text',
    description: 'textarea',
  };

  static inputValidation: InputValidations<ITransactionPayload> = {
    ...CollectionItem.inputValidation,
    type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
    amount: z.number().finite().positive(),
    date: z.date(),
    salaryMonth: z.date(),
    categories: z.array(z.string()).min(1),
    subCategories: z.array(z.string()).min(1),
    accounts: z.array(z.string()).min(1),
    occasion: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
    vendor: z.string().optional(),
  };
}
