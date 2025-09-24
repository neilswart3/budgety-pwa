import { Account } from './Account';
import { IAccount, IAccountPayload } from './Account/types';
import { Category } from './Category';
import { ICategory, ICategoryPayload } from './Category/types';
import { Occasion } from './Occasion';
import { IOccasion, IOccasionPayload } from './Occasion/types';
import { Saving } from './Saving';
import { ISaving, ISavingPayload } from './Saving/types';
import { SubCategory } from './SubCategory';
import { ISubCategory, ISubCategoryPayload } from './SubCategory/types';
import { TheDemo } from './TheDemo';
import { ITheDemo, ITheDemoPayload } from './TheDemo/types';
import { Transaction } from './Transaction';
import { ITransaction, ITransactionPayload } from './Transaction/types';

export type CollectionItems =
  | IAccount
  | ICategory
  | ISubCategory
  | IOccasion
  | ISaving
  | ITransaction
  | ITheDemo;

export type CollectionModelType =
  | Account
  | Category
  | Occasion
  | Saving
  | SubCategory
  | Transaction
  | TheDemo;
//   | (new (payload: IAccountPayload) => Account)
//   | (new (payload: ICategoryPayload) => Category)
//   | (new (payload: IOccasionPayload) => Occasion)
//   | (new (payload: ISavingPayload) => Saving)
//   | (new (payload: ITransactionPayload) => Transaction);

export type CollectionModelPayloadTypes =
  | IAccountPayload
  | ICategoryPayload
  | IOccasionPayload
  | ISavingPayload
  | ISubCategoryPayload
  | ITransactionPayload
  | ITheDemoPayload;
