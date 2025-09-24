import { CollectionKey } from '@/constants';
import { Account } from '../models';
import { IAccount, IAccountPayload } from '../models/Account/types';
import { BaseCollectionController } from './BaseCollection.Controller';

export class AccountController extends BaseCollectionController<
  IAccount,
  IAccountPayload,
  Account
> {
  constructor() {
    super({ key: CollectionKey.ACCOUNTS, model: Account });
  }
}
