import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { ICategory, ICategoryPayload } from './types';
import { z } from 'zod';

export class Category extends CollectionItem implements ICategory {
  description: string;
  color: string;
  icon: string;
  subCategories: string[];

  constructor({
    description,
    color,
    icon,
    subCategories,
    ...args
  }: ICategoryPayload) {
    super(args);

    this.color = color;
    this.icon = icon;
    this.description = description;
    this.subCategories = subCategories || [];
  }

  static inputTypes: InputTypes<ICategoryPayload> = {
    ...CollectionItem.inputTypes,
    color: 'color',
    icon: 'select',
    description: 'textarea',
    subCategories: 'multiSelect',
  };

  static inputValidation: InputValidations<ICategoryPayload> = {
    ...CollectionItem.inputValidation,
    color: z.string(),
    icon: z.string(),
    description: z.string().optional(),
    subCategories: z.array(z.string()),
  };
}
