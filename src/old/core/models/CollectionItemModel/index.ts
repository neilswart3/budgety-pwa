import { IBaseCollectionItem, ICollectionItemModelPayload } from './types';
import { v4 as uuid } from 'uuid';

export default class CollectionItemModel implements IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy: string;

  constructor({ id, name, created, createdBy }: ICollectionItemModelPayload) {
    const currentDate = new Date();

    this.id = id || uuid();
    this.name = name;
    this.created = created || currentDate;
    this.modified = currentDate;
    this.createdBy = createdBy || 'me';
  }
}
