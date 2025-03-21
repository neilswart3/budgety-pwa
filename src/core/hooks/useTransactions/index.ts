import { ITransactionItem, TransactionCollection } from '@/core';
import { UseMutationOptions, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCollection } from '../useCollection';

const queryKey = ['transactions'];

const useTransactionsQuery = (
  id: string | undefined = undefined
): UseQueryResult<ITransactionItem | ITransactionItem[]> => {
  const collection = useMemo(
    () => ({ transaction: new TransactionCollection() }),
    []
  );

  return useCollection.query<ITransactionItem, TransactionCollection>({
    id,
    queryKey,
    collection: collection.transaction,
  });
};

type UseTransactionsMutationPayload = Omit<UseMutationOptions, 'mutationFn'>;

const useTransactionsMutation = (
  options: Partial<UseTransactionsMutationPayload> = {}
) => {
  const collection = useMemo(
    () => ({ transaction: new TransactionCollection() }),
    []
  );

  return useCollection.mutation<ITransactionItem, TransactionCollection>({
    queryKey,
    collection: collection.transaction,
    options,
  });
};

export const useTransactions = {
  query: useTransactionsQuery,
  mutation: useTransactionsMutation,
};
