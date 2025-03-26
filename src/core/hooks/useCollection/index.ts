import {
  CollectionSearchQueryArg,
  IBaseModelPayload,
  ICollectionItemType,
  StorageKey,
} from '@/core';
import Collection from '@/core/collections/Collection';
import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { useCallback } from 'react';

const useCollectionQuerySearch = <T extends ICollectionItemType>({
  queryKey,
  query,
  fetchFn,
}: {
  queryKey: QueryKey;
  fetchFn: () => Promise<T[] | Error>;
  query?: CollectionSearchQueryArg<T>;
}): UseQueryResult<T[]> => {
  const fetchCollection = useCallback(async () => {
    try {
      return await fetchFn();
    } catch (error) {
      console.log('error:', error);
    }
  }, [fetchFn]);

  return useQuery({
    queryKey: [
      ...queryKey,
      ...(Object.values(query || {}).filter(Boolean).length ? [query] : []),
    ],
    queryFn: fetchCollection,
  });
};

const useCollectionQuerySingle = <T extends ICollectionItemType>({
  queryKey,
  id,
  fetchFn,
}: {
  queryKey: QueryKey;
  fetchFn: () => Promise<T | Error | undefined>;
  id: string | undefined;
}): UseQueryResult<T> => {
  const fetchCollection = useCallback(async () => {
    try {
      return await fetchFn();
    } catch (error) {
      console.log('error:', error);
    }
  }, [fetchFn]);

  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: fetchCollection,
  });
};

interface UseCollectionMutationPayload<C> {
  queryKey: QueryKey;
  collection: C;
  options: Partial<Omit<UseMutationOptions, 'mutationFn'>>;
}

interface UseCollectionMutationResult<T extends ICollectionItemType> {
  createItem: UseMutationResult<void, Error, IBaseModelPayload<T>>;
  updateItem: UseMutationResult<
    void,
    Error,
    IBaseModelPayload<T> & { id: string }
  >;
  deleteItem: UseMutationResult<void, Error, string, unknown>;
}

const useCollectionMutation = <
  T extends ICollectionItemType,
  C extends Collection<T, StorageKey>
>({
  queryKey,
  collection,
  options = {},
}: UseCollectionMutationPayload<C>): UseCollectionMutationResult<T> => {
  const queryClient = useQueryClient();

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries({ queryKey });

    if (options?.onSuccess) {
      options.onSuccess({}, {} as unknown as void, {});
    }
  }, [options, queryClient, queryKey]);

  const createItem = useCallback(
    async (payload: IBaseModelPayload<T>) => {
      try {
        await collection.createItem(payload);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection]
  );

  const updateItem = useCallback(
    async (payload: IBaseModelPayload<T> & { id: string }): Promise<void> => {
      try {
        await collection.updateItem(payload);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      try {
        await collection.deleteItem(id);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection]
  );

  return {
    createItem: useMutation({
      mutationFn: createItem,
      onSuccess: handleSuccess,
    }),
    updateItem: useMutation({
      mutationFn: updateItem,
      onSuccess: handleSuccess,
    }),
    deleteItem: useMutation({
      mutationFn: deleteItem,
      onSuccess: handleSuccess,
    }),
  };
};

export const useCollection = {
  search: useCollectionQuerySearch,
  single: useCollectionQuerySingle,
  mutation: useCollectionMutation,
};
