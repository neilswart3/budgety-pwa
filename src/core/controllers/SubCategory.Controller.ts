import { CollectionKey } from '@/constants';
import { ISubCategory, ISubCategoryPayload, SubCategory } from '../models';
import { BaseCollectionController } from './BaseCollection.Controller';

export class SubCategoryController extends BaseCollectionController<
  ISubCategory,
  ISubCategoryPayload,
  SubCategory
> {
  constructor() {
    super({ key: CollectionKey.SUB_CATEGORIES, model: SubCategory });
  }

  //   key: CollectionKey;
  //   repository: LocalStorageRepository<SubCategory>;

  //   constructor() {
  //     super();

  //     this.key = CollectionKey.SUB_CATEGORIES;
  //     this.repository = new LocalStorageRepository(this.key);
  //   }

  //   list = async (): Promise<SubCategory[] | Error> => {
  //     try {
  //       return await this.repository.list();
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  //   search = async (
  //     query: Partial<Record<keyof SubCategory, string[]>> = {}
  //   ): Promise<SubCategory[] | Error> => {
  //     try {
  //       return await this.repository.search(query);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  //   item = async (id: string): Promise<SubCategory | Error> => {
  //     try {
  //       return await this.repository.item(id);
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  //   create = async (payload: ISubCategoryPayload): Promise<void> => {
  //     try {
  //       await this.repository.create(new SubCategory(payload));
  //     } catch (error) {
  //       throw new Error((error as Error).message);
  //     }
  //   };

  //   update = async (payload: ISubCategory): Promise<void | Error> => {
  //     try {
  //       const updatedItem = new SubCategory({
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
