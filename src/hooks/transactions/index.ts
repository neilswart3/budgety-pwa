import { CollectionKey } from '@/constants';
import { TransactionController } from '@/core';
import { CreateCollectionQueries } from '@/utils/CreateCollectionQueries';

export const {
  useTransactionsCreate,
  useTransactionsDelete,
  useTransactionsItem,
  useTransactionsList,
  useTransactionsSearch,
  useTransactionsUpdate,
} = CreateCollectionQueries.createQueries<CollectionKey.TRANSACTIONS>(
  TransactionController
);
