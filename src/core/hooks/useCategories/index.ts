import { CategoryCollection } from '@/core/collections/CategoryCollection';
import { ICategoryItem } from '@/core/models';
import { UseMutationOptions, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCollection } from '../useCollection';

const queryKey = ['categories'];

const useCategoriesQuery = (
  id: string | undefined = undefined
): UseQueryResult<ICategoryItem | ICategoryItem[]> => {
  const collection = useMemo(
    () => ({ category: new CategoryCollection() }),
    []
  );

  return useCollection.query<ICategoryItem, CategoryCollection>({
    id,
    queryKey,
    collection: collection.category,
  });
};

type UseCategoriesMutationPayload = Omit<UseMutationOptions, 'mutationFn'>;

const useCategoriesMutation = (options: UseCategoriesMutationPayload) => {
  const collection = useMemo(
    () => ({ category: new CategoryCollection() }),
    []
  );

  return useCollection.mutation<ICategoryItem, CategoryCollection>({
    queryKey,
    collection: collection.category,
    options,
  });
};

export const useCategories = {
  query: useCategoriesQuery,
  mutation: useCategoriesMutation,
};
