import { CategoryCollection } from '@/old/core/collections/CategoryCollection';
import { ICategoryItem } from '@/old/core/models';
import { UseMutationOptions } from '@tanstack/react-query';
import { useCollection } from '../useCollection';
import { CollectionSearchQueryArg } from '@/old/core/collections';

const queryKey = ['categories'];

type UseCategoriesMutationPayload = Omit<UseMutationOptions, 'mutationFn'>;
const useCategoriesMutation = (options: UseCategoriesMutationPayload) =>
  useCollection.mutation<ICategoryItem, typeof CategoryCollection>({
    queryKey,
    collection: CategoryCollection,
    options,
  });

export const useCategories = {
  mutation: useCategoriesMutation,
  search: (query: CollectionSearchQueryArg<ICategoryItem> = undefined) =>
    useCollection.search<ICategoryItem>({
      queryKey,
      query,
      fetchFn: () => CategoryCollection.search(query),
    }),
  single: (id: string | undefined) =>
    useCollection.single<ICategoryItem>({
      queryKey,
      id,
      fetchFn: () => CategoryCollection.fetchItem(id),
    }),
};
