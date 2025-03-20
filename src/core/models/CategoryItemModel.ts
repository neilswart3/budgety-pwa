import CollectionItemModel from './CollectionItemModel';
import { IBaseCategoryItem, IBaseModelPayload, ICategoryItem } from './types';

export type ICategoryItemModelPayload = IBaseModelPayload<IBaseCategoryItem>;

export class CategoryItemModel
  extends CollectionItemModel
  implements ICategoryItem
{
  description: string;

  constructor({
    id,
    name,
    created,
    createdBy,
    description,
  }: ICategoryItemModelPayload) {
    super({ id, name, created, createdBy });

    this.description = description;
  }
}
