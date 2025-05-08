import { CollectionKey } from '@/constants';

export abstract class CollectionController {
  abstract key: CollectionKey;

  abstract fetchList(): void;
  abstract search(query: object): void;
  abstract fetchItem(id: string): void;

  abstract createItem(payload: object): void;
  abstract updateItem(payload: object): void;
  abstract deleteItem(id: string): void;
}
