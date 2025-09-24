import { CollectionKey } from '@/constants';
import { Saving } from '../models';
import { ISaving, ISavingPayload } from '../models/Saving/types';
import { BaseCollectionController } from './BaseCollection.Controller';

export class SavingController extends BaseCollectionController<
  ISaving,
  ISavingPayload,
  Saving
> {
  constructor() {
    super({ key: CollectionKey.SAVINGS, model: Saving });
  }

  //   key: CollectionKey;
  //   repository: LocalStorageRepository<Saving>;
  //   constructor() {
  //     super();
  //     this.key = CollectionKey.SAVINGS;
  //     this.repository = new LocalStorageRepository(this.key);
  //   }
  //   list = async (): Promise<Saving[] | Error> => {
  //     try {
  //       return await this.repository.list();
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
  //   search = async (query = {}): Promise<Saving[] | Error> => {
  //     try {
  //       return await this.repository.search(query);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
  //   item = async (id: string): Promise<Saving | Error> => {
  //     try {
  //       return await this.repository.item(id);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
  //   create = async (payload: ISavingPayload | Saving): Promise<void> => {
  //     try {
  //       const newElement =
  //         payload instanceof Saving ? payload : new Saving(payload);
  //       await this.repository.create(newElement);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
  //   update = async (payload: ISaving): Promise<void | Error> => {
  //     try {
  //       const updatedItem = new Saving({
  //         ...payload,
  //         modifiedAt: new Date().toISOString(),
  //       });
  //       await this.repository.update(updatedItem);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
  //   delete = async (id: string): Promise<void | Error> => {
  //     try {
  //       await this.repository.delete(id);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };
}
