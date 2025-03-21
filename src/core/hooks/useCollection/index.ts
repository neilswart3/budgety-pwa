import { IBaseModelPayload, ICollectionItemType, StorageKey } from '@/core';
import Collection from '@/core/collections/Collection';
import {
  QueryFunctionContext,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueries,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { useCallback } from 'react';

interface UseCollectionQueryPayload<
  T extends ICollectionItemType,
  C extends Collection<T, StorageKey>
> {
  id: string | undefined;
  queryKey: QueryKey;
  collection: C;
}

const useCollectionQuery = <
  T extends ICollectionItemType,
  C extends Collection<T, StorageKey>
>({
  queryKey,
  id,
  collection,
}: UseCollectionQueryPayload<T, C>): UseQueryResult<T | T[]> => {
  const fetchAll = useCallback(async (): Promise<T[] | undefined> => {
    try {
      return (await collection.fetchAll()) as T[];
    } catch (error) {
      console.log('error:', error);
    }
  }, [collection]);

  const fetchItem = useCallback(
    async ({
      client,
      queryKey,
    }: QueryFunctionContext): Promise<T | undefined> => {
      try {
        const itemFromQuery = (
          client?.getQueryData([queryKey[0]]) as T[]
        )?.find((t) => t.id === id);

        if (itemFromQuery?.id) return await Promise.resolve(itemFromQuery);

        return (await collection.fetchItem(id as string)) as T;
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection, id]
  );

  const [list, single]: [UseQueryResult<T[]>, UseQueryResult<T>] = useQueries({
    queries: [
      ...[{ queryKey, queryFn: fetchAll }],
      ...(id ? [{ queryKey: [...queryKey, id], queryFn: fetchItem }] : []),
    ],
  });

  return id ? single : list;
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
  query: useCollectionQuery,
  mutation: useCollectionMutation,
};
