import CollectionItemModel from '../CollectionItemModel';
import {
  IBaseTransactionItemInputTypes,
  ITransactionItem,
  ITransactionItemModelPayload,
  TransactionItemTypeField,
} from './types';

export class TransactionItemModel
  extends CollectionItemModel
  implements ITransactionItem
{
  description: string;
  type: TransactionItemTypeField;
  amount: number;
  user: string;
  category: string;
  occurrence: string;
  account: string;
  location: string;
  date: Date;
  salaryMonth: Date;

  static inputTypes: IBaseTransactionItemInputTypes = {
    name: 'text',
    type: 'enum',
    description: 'textarea',
    amount: 'number',
    user: 'select',
    category: 'select',
    account: 'select',
    occurrence: 'select',
    location: 'text',
    date: 'datePicker',
    salaryMonth: 'monthYearPicker',
  };

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
    occurrence,
    account,
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
    this.occurrence = occurrence;
    this.account = account;
    this.location = location;
    this.date = date;
    this.salaryMonth = salaryMonth;
  }
}
