import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { IOccasion, IOccasionPayload } from './types';
import { z } from 'zod';

export class Occasion extends CollectionItem implements IOccasion {
  description: string;
  categories: string[];

  constructor({ description, categories, ...args }: IOccasionPayload) {
    super(args);

    this.categories = categories;
    this.description = description;
  }

  static inputTypes: InputTypes<IOccasionPayload> = {
    ...CollectionItem.inputTypes,
    categories: 'multiSelect',
    description: 'textarea',
  };

  static inputValidation: InputValidations<IOccasionPayload> = {
    ...CollectionItem.inputValidation,
    categories: z.array(z.string()),
    description: z.string().optional(),
  };
}
