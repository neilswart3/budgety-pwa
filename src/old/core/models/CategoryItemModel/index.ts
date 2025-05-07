import CollectionItemModel from '../CollectionItemModel';
import { ICategoryItem, ICategoryItemModelPayload } from './types';

export class CategoryItemModel
  extends CollectionItemModel
  implements ICategoryItem
{
  description: string;
  icon: string;
  color: string;

  constructor({
    id,
    name,
    created,
    createdBy,
    icon,
    color,
    description,
  }: ICategoryItemModelPayload) {
    super({ id, name, created, createdBy });

    this.icon = icon;
    this.color = color;
    this.description = description;
  }
}
