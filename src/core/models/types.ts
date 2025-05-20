import { Account } from './Account';
import { IAccountPayload } from './Account/types';
import { Category } from './Category';
import { ICategoryPayload } from './Category/types';
import { Occasion } from './Occasion';
import { IOccasionPayload } from './Occasion/types';
import { Saving } from './Saving';
import { ISavingPayload } from './Saving/types';
import { Transaction } from './Transaction';
import { ITransactionPayload } from './Transaction/types';

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
