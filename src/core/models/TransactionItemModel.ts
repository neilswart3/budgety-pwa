import CollectionItemModel from './CollectionItemModel';
import { ITransactionItem, TransactionItemTypeField } from './types';

type ITransactionItemModelPayload = Pick<
  ITransactionItem,
  | 'name'
  | 'description'
  | 'type'
  | 'amount'
  | 'user'
  | 'category'
  | 'source'
  | 'location'
  | 'date'
  | 'salaryMonth'
>;

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
