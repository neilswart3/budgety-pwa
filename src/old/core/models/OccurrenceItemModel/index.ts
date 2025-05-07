import CollectionItemModel from '../CollectionItemModel';
import { IOccurrenceItem, IOccurrenceItemModelPayload } from './types';

export class OccurrenceItemModel
  extends CollectionItemModel
  implements IOccurrenceItem
{
  description: string;

  constructor({ description, ...rest }: IOccurrenceItemModelPayload) {
    super(rest);

    this.description = description;
  }
}
