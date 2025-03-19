import CollectionItemModel from './CollectionItemModel';
import { IBaseCategoryItem, IBaseCollectionItem, ICategoryItem } from './types';

export type ICategoryItemModelPayload = IBaseCategoryItem &
  Partial<Pick<IBaseCollectionItem, 'id' | 'name' | 'created' | 'createdBy'>>;

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
