import CollectionItemModel from './CollectionItemModel';
import { IAccountItem, IBaseAccountItem, IBaseModelPayload } from './types';

export type IAccountItemModelPayload = IBaseModelPayload<IBaseAccountItem>;

export class AccountItemModel
  extends CollectionItemModel
  implements IAccountItem
{
  description: string;
  monthBudgetAmount: number;

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
