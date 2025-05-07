import CollectionItemModel from '../CollectionItemModel';
import {
  IAccountItem,
  IAccountItemModelPayload,
  IBaseAcountItemInputTypes,
} from './types';

export class AccountItemModel
  extends CollectionItemModel
  implements IAccountItem
{
  description: string;
  monthBudgetAmount: number;

  static inputTypes: IBaseAcountItemInputTypes = {
    name: 'text',
    description: 'textarea',
    monthBudgetAmount: 'number',
  };

  constructor({
    id,
    name,
    created,
    createdBy,
    description,
    monthBudgetAmount,
  }: IAccountItemModelPayload) {
    super({ id, name, created, createdBy });

    this.description = description;
    this.monthBudgetAmount = monthBudgetAmount;
  }
}
