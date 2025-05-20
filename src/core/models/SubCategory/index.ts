import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { ISubCategory, ISubCategoryPayload } from './types';
import { z } from 'zod';

export class SubCategory extends CollectionItem implements ISubCategory {
  //   color: string;
  icon: string;
  category: string;
  description: string;

  constructor({
    description,
    // color,
    icon,
    category,
    ...args
  }: ISubCategoryPayload) {
    super(args);

    // this.color = color;
    this.icon = icon;
    this.category = category;
    this.description = description;
  }

  static inputTypes: InputTypes<ISubCategoryPayload> = {
    ...CollectionItem.inputTypes,
    // color: 'color',
    icon: 'select',
    category: 'select',
    description: 'textarea',
  };

  static inputValidation: InputValidations<ISubCategoryPayload> = {
    ...CollectionItem.inputValidation,
    // color: z.string(),
    icon: z.string(),
    category: z.string(),
    description: z.string().optional(),
  };
}
