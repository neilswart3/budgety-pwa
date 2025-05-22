import { Account } from './Account';
import { IAccount, IAccountPayload } from './Account/types';
import { Category } from './Category';
import { ICategory, ICategoryPayload } from './Category/types';
import { Occasion } from './Occasion';
import { IOccasion, IOccasionPayload } from './Occasion/types';
import { Saving } from './Saving';
import { ISaving, ISavingPayload } from './Saving/types';
import { ISubCategory } from './SubCategory/types';
import { Transaction } from './Transaction';
import { ITransaction, ITransactionPayload } from './Transaction/types';

export type CollectionItems =
  | IAccount
  | ICategory
  | ISubCategory
  | IOccasion
  | ISaving
  | ITransaction;

export type CollectionModelType =
  | (new (payload: IAccountPayload) => Account)
  | (new (payload: ICategoryPayload) => Category)
  | (new (payload: IOccasionPayload) => Occasion)
  | (new (payload: ISavingPayload) => Saving)
  | (new (payload: ITransactionPayload) => Transaction);

export type CollectionModelPayloadTypes =
  | IAccountPayload
  | ICategoryPayload
  | IOccasionPayload
  | ISavingPayload
  | ITransactionPayload;
