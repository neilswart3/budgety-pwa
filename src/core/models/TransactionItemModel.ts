import CollectionItemModel from './CollectionItemModel';
import {
  IBaseModelPayload,
  IBaseTransactionItem,
  ITransactionItem,
  TransactionItemTypeField,
} from './types';

export type ITransactionItemModelPayload =
  IBaseModelPayload<IBaseTransactionItem>;

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
    id,
    name,
    created,
    createdBy,

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
    super({ id, name, created, createdBy });

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
