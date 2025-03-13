import { StorageService } from '../services';

export type ServiceTypes<T extends ICollectionItem> = StorageService<T>;

export interface ICollection<T extends ICollectionItem> {
  createItem(el: T): Promise<void | Error>;
  fetchItem(id: string): Promise<T | Error>;
  fetchAll(): Promise<T[] | Error>;
  updateItem(id: string): Promise<void | Error>;
  deleteItem(id: string): Promise<void | Error>;
  search(query: unknown): Promise<T[] | Error>;
}

export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy?: string;
}

export type ITransactionItemType = 'income' | 'expense';

export interface IBaseTransactionItem {
  name: string;
  description: string;
  type: ITransactionItemType;
  amount: number;
  user: string;
  category: string;
  source: string;
  location: string;
  date: Date;
  salaryMonth: Date;
}

export type ITransactionItem = IBaseCollectionItem & IBaseTransactionItem;

export type ICollectionItem = ITransactionItem;
