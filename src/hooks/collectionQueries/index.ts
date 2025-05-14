import { CollectionKey } from '@/constants';
import {
  Account,
  AccountController,
  Category,
  CategoryController,
  Occasion,
  OccasionController,
  Saving,
  SavingController,
  Transaction,
  TransactionController,
} from '@/core';
import { CollectionItem } from '@/core/models/CollectionItem';
import { CreateCollectionQueries } from '@/utils/CreateCollectionQueries';
import { ControllerConstructor } from '@/utils/CreateCollectionQueries/types';

const createQueries = <K extends CollectionKey, M extends CollectionItem>(
  controller: ControllerConstructor
) => CreateCollectionQueries.createQueries<K, M>(controller);

export const {
  useAccountsCreate,
  useAccountsDelete,
  useAccountsItem,
  useAccountsList,
  useAccountsSearch,
  useAccountsUpdate,

  useCategoriesCreate,
  useCategoriesDelete,
  useCategoriesItem,
  useCategoriesList,
  useCategoriesSearch,
  useCategoriesUpdate,

  useOccasionsCreate,
  useOccasionsDelete,
  useOccasionsItem,
  useOccasionsList,
  useOccasionsSearch,
  useOccasionsUpdate,

  useSavingsCreate,
  useSavingsDelete,
  useSavingsItem,
  useSavingsList,
  useSavingsSearch,
  useSavingsUpdate,

  useTransactionsCreate,
  useTransactionsDelete,
  useTransactionsItem,
  useTransactionsList,
  useTransactionsSearch,
  useTransactionsUpdate,
} = {
  ...createQueries<CollectionKey.ACCOUNTS, Account>(AccountController),
  ...createQueries<CollectionKey.CATEGORIES, Category>(CategoryController),
  ...createQueries<CollectionKey.OCCASIONS, Occasion>(OccasionController),
  ...createQueries<CollectionKey.SAVINGS, Saving>(SavingController),
  ...createQueries<CollectionKey.TRANSACTIONS, Transaction>(
    TransactionController
  ),
};
