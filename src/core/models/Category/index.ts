import { CollectionItem } from '../CollectionItem';
import { InputTypes } from '../CollectionItem/types';
import { ICategory, ICategoryPayload } from './types';

export class Category extends CollectionItem implements ICategory {
  description: string;
  color: string;
  icon: string;

  constructor({ description, color, icon, ...args }: ICategoryPayload) {
    super(args);

    this.description = description;
    this.color = color;
    this.icon = icon;
  }

  static inputTypes: InputTypes<ICategoryPayload> = {
    ...CollectionItem.inputTypes,
    description: 'textarea',
    color: 'color',
    icon: 'select',
  };
}
