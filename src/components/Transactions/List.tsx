import { ITransactionItem, TransactionCollection } from '@/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionCard } from '@/components/ui';
import { Stack } from '@chakra-ui/react';

export const TransactionsList: React.FC = () => {
  const [items, setItems] = useState<ITransactionItem[] | undefined>(undefined);

  const instance = useMemo(() => new TransactionCollection(), []);

  const fetchTransactions = useCallback(async () => {
    try {
      const entries = await instance.search();

      setItems(entries as ITransactionItem[]);
    } catch (error) {
      console.log('error:', error);
    }
  }, [instance]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <Stack gap={4}>
      {items?.map(
        ({ id, name, date, amount, category, source, type, location }) => (
          <TransactionCard
            key={id}
            id={id}
            name={name}
            type={type}
            amount={amount}
            date={date}
            category={category}
            location={location}
            source={source}
          />
        )
      )}
    </Stack>
  );
};
