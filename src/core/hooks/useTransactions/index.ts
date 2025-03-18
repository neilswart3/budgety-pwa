import {
  ITransactionItem,
  ITransactionItemModelPayload,
  TransactionCollection,
} from '@/core';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const queryKey = ['transactions'];

const useTransactionsQuery = () => {
  const collection = useMemo(
    () => ({ transaction: new TransactionCollection() }),
    []
  );

  const fetchTransactions = useCallback(async () => {
    try {
      return (await collection.transaction.search()) as ITransactionItem[];
    } catch (error) {
      console.log('error:', error);
    }
  }, [collection]);

  return useQuery({
    queryKey,
    queryFn: fetchTransactions,
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

  const updateTransactions = useCallback(
    async (payload: ITransactionItemModelPayload) => {
      try {
        await collection.transaction.createItem(payload);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [collection.transaction]
  );

  return useMutation({
    mutationFn: updateTransactions,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey });

      options?.onSuccess &&
        options.onSuccess(data, variables as unknown as void, context);
    },
  });
};

export const useTransactions = {
  query: useTransactionsQuery,
  mutation: useTransactionsMutation,
};
