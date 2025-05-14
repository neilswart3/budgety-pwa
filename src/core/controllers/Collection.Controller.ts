import { CollectionKey } from '@/constants';

export abstract class CollectionController {
  abstract key: CollectionKey;

  abstract list(): void;
  abstract search(query: object): void;
  abstract item(id: string): void;

  abstract create(payload: object): void;
  abstract update(payload: object): void;
  abstract delete(id: string): void;
}
