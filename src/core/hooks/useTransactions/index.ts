import { ITransactionItem, TransactionCollection } from '@/core';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

export const useTransactions = () => {
  const collection = useMemo(() => new TransactionCollection(), []);

  const fetchTransactions = useCallback(async () => {
    try {
      return (await collection.search()) as ITransactionItem[];
    } catch (error) {
      console.log('error:', error);
    }
  }, [collection]);

  return useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions });
};
