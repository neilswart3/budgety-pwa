import { v4 as uuid } from 'uuid';
import { ICollectionItem, ICollectionItemPayload, InputTypes } from './types';

export abstract class CollectionItem implements ICollectionItem {
  id: string;
  name: string;
  createdAt: string;
  modifiedAt: string;
  createdBy: string;
  modifiedBy: string;

  constructor({
    id,
    name,
    createdAt,
    modifiedAt,
    createdBy,
    modifiedBy,
  }: ICollectionItemPayload) {
    const currentDate = new Date().toISOString();

    this.id = id || uuid();
    this.name = name;
    this.createdAt = createdAt || currentDate;
    this.modifiedAt = modifiedAt || currentDate;
    this.createdBy = createdBy || 'demo-user';
    this.modifiedBy = modifiedBy || 'demo-user';
  }

  static inputTypes: InputTypes<ICollectionItemPayload> = {
    name: 'text',
  };
}
