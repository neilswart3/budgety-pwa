import CollectionItemModel from './CollectionItemModel';
import {
  IBaseTransactionItem,
  ITransactionItem,
  TransactionItemTypeField,
} from './types';

export type ITransactionItemModelPayload = IBaseTransactionItem;

export class TransactionItemModel
  extends CollectionItemModel
  implements ITransactionItem
{
  description: string;
  type: TransactionItemTypeField;
  amount: number;
  user: string;
  category: string;
  source: string;
  location: string;
  date: Date;
  salaryMonth: Date;

  constructor({
    name,
    description,
    type,
    amount,
    user,
    category,
    source,
    location,
    date,
    salaryMonth,
  }: ITransactionItemModelPayload) {
    super({ name });

    this.description = description;
    this.type = type;
    this.amount = amount;
    this.user = user;
    this.category = category;
    this.source = source;
    this.location = location;
    this.date = date;
    this.salaryMonth = salaryMonth;
  }
}
