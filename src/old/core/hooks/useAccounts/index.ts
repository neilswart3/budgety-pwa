import { IAccountItem } from '@/core/models';
import { UseMutationOptions } from '@tanstack/react-query';
import { useCollection } from '../useCollection';
import { CollectionSearchQueryArg } from '@/core/collections';
import { AccountCollection } from '@/core/collections/AccountCollection';

const queryKey = ['accounts'];

type UseAccountsMutationPayload = Omit<UseMutationOptions, 'mutationFn'>;
const useCategoriesMutation = (options: UseAccountsMutationPayload) =>
  useCollection.mutation<IAccountItem, typeof AccountCollection>({
    queryKey,
    collection: AccountCollection,
    options,
  });

export const useAccounts = {
  mutation: useCategoriesMutation,
  search: (query: CollectionSearchQueryArg<IAccountItem> = undefined) =>
    useCollection.search<IAccountItem>({
      queryKey,
      query,
      fetchFn: () => AccountCollection.search(query),
    }),
  single: (id: string | undefined) =>
    useCollection.single<IAccountItem>({
      queryKey,
      id,
      fetchFn: () => AccountCollection.fetchItem(id),
    }),
};
