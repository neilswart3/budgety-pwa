import {
  ITransactionItem,
  ITransactionItemModelPayload,
  TransactionCollection,
} from '@/core';
import {
  DefinedUseQueryResult,
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const queryKey = ['transactions'];
type UseTransactionsQueryResult = ITransactionItem[] | ITransactionItem;

const useTransactionsQuery = <T extends UseTransactionsQueryResult>(
  id: string | undefined = undefined
): DefinedUseQueryResult<T> => {
  const collection = useMemo(
    () => ({ transaction: new TransactionCollection() }),
    []
  );

  const fetchTransactions = useCallback(async (): Promise<
    ITransactionItem[] | undefined
  > => {
    try {
      return (await collection.transaction.search()) as ITransactionItem[];
    } catch (error) {
      console.log('error:', error);
    }
  }, [collection]);

  const fetchSingleTransaction = useCallback(
    async ({
      client,
      queryKey,
    }: QueryFunctionContext): Promise<ITransactionItem | undefined> => {
      try {
        const itemFromQuery = (
          client?.getQueryData([queryKey[0]]) as ITransactionItem[]
        )?.find((t) => t.id === id);

        if (itemFromQuery?.id) return Promise.resolve(itemFromQuery);

        return (await collection.transaction.fetchItem(
          id as string
        )) as ITransactionItem;
      } catch (error) {
        console.log('error:', error);
      }
    },
    [id]
  );

  // @ts-ignore
  return useQuery({
    queryKey: id ? [...queryKey, id] : queryKey,
    queryFn: id ? fetchSingleTransaction : fetchTransactions,
    // initialData: id ? {} : [],
  });
};

interface UseTransactionsMutationPayload
  extends Omit<UseMutationOptions, 'mutationFn'> {}

const useTransactionsMutation = (
  options: Partial<UseTransactionsMutationPayload> = {}
) => {
  const queryClient = useQueryClient();
  const collection = useMemo(
    () => ({ transaction: new TransactionCollection() }),
    []
  );

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey });
    options?.onSuccess && options.onSuccess({}, {} as unknown as void, {});
  };

  const createItem = useCallback(
    async (payload: ITransactionItemModelPayload) => {
      try {
        await collection.transaction.createItem(payload);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection.transaction]
  );

  const deleteItem = useCallback(async (id: string) => {
    try {
      await collection.transaction.deleteItem(id);
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  const mutateCreate = useMutation({
    mutationFn: createItem,
    onSuccess: handleSuccess,
  });

  const mutateDelete = useMutation({
    mutationFn: deleteItem,
    onSuccess: handleSuccess,
  });

  return { createItem: mutateCreate, deleteItem: mutateDelete };
};

export const useTransactions = {
  query: useTransactionsQuery,
  mutation: useTransactionsMutation,
};
