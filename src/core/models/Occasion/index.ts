import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { IOccasion, IOccasionPayload } from './types';
import { z } from 'zod';

export class Occasion extends CollectionItem implements IOccasion {
  description: string;
  categories: string[];
  complete: boolean;

  constructor({
    description,
    categories,
    complete,
    ...args
  }: IOccasionPayload) {
    super(args);

    this.categories = categories;
    this.description = description;
    this.complete = complete;
  }

  static inputTypes: InputTypes<IOccasionPayload> = {
    ...CollectionItem.inputTypes,
    categories: 'multiSelect',
    description: 'textarea',
    complete: 'switch',
  };

  static inputValidation: InputValidations<IOccasionPayload> = {
    ...CollectionItem.inputValidation,
    categories: z.array(z.string()),
    description: z.string().optional(),
    complete: z.boolean(),
  };
}
