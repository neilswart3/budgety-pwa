import { IAccountPayload } from './models/Account/types';
import { ICategoryPayload } from './models/Category/types';
import { IOccasionPayload } from './models/Occasion/types';
import { ISavingPayload } from './models/Saving/types';
import { ITransactionPayload } from './models/Transaction/types';

export type ICollectionPayload =
  | IAccountPayload
  | ICategoryPayload
  | IOccasionPayload
  | ISavingPayload
  | ITransactionPayload;
