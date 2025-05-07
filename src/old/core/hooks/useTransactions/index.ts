import {
  CollectionSearchQueryArg,
  ITransactionItem,
  TransactionCollection,
} from '@/old/core';
import { UseMutationOptions } from '@tanstack/react-query';
import { useCollection } from '../useCollection';

const queryKey = ['transactions'];

type UseTransactionsMutationPayload = Omit<UseMutationOptions, 'mutationFn'>;
const useTransactionsMutation = (
  options: Partial<UseTransactionsMutationPayload> = {}
) =>
  useCollection.mutation<ITransactionItem, typeof TransactionCollection>({
    queryKey,
    collection: TransactionCollection,
    options,
  });

export const useTransactions = {
  mutation: useTransactionsMutation,
  search: (query: CollectionSearchQueryArg<ITransactionItem> = undefined) =>
    useCollection.search<ITransactionItem>({
      queryKey,
      query,
      fetchFn: () => TransactionCollection.search(query),
    }),
  single: (id: string) =>
    useCollection.single<ITransactionItem>({
      queryKey,
      id,
      fetchFn: () => TransactionCollection.fetchItem(id),
    }),
};
