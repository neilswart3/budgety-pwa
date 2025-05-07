import { CollectionItem } from '../CollectionItem';
import { InputTypes } from '../CollectionItem/types';
import { IOccasion, IOccasionPayload } from './types';

export class Occasion extends CollectionItem implements IOccasion {
  description: string;
  categories: string[];

  constructor({ description, categories, ...args }: IOccasionPayload) {
    super(args);

    this.description = description;
    this.categories = categories;
  }

  static inputTypes: InputTypes<IOccasionPayload> = {
    ...CollectionItem.inputTypes,
    description: 'textarea',
    categories: 'multiSelect',
  };
}
