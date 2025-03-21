import {
  ITransactionItem,
  TransactionCollection,
  useTransactions,
} from '@/core';
import { TransactionCard } from '@/components/ui';
import { Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  categoryId?: string;
}

export const TransactionsList: React.FC<Props> = ({ categoryId }) => {
  const { data, isLoading } = useTransactions.query();
  const [transactionsByCat, setTransactionsByCat] = useState<
    ITransactionItem[] | undefined
  >(undefined);

  /**
   * Do something else here. Do it with the hook
   */
  const instance = useMemo(() => new TransactionCollection(), []);
  const fetchTransactionsByCategory = useCallback(
    async (categoryId: string) => {
      try {
        const transactionsByCategory = await instance.search({ categoryId });

        setTransactionsByCat(transactionsByCategory as ITransactionItem[]);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [instance]
  );

  useEffect(() => {
    if (categoryId) fetchTransactionsByCategory(categoryId);
  }, [categoryId, fetchTransactionsByCategory]);

  const theData = categoryId ? transactionsByCat || [] : data || [];

  return (
    <Stack gap={4}>
      {!theData &&
        isLoading &&
        Array.from({ length: 9 }).map((_, i) => (
          <TransactionCard.Loading key={`transactions-list-placeholder-${i}`} />
        ))}

      {!!(theData as ITransactionItem[])?.length &&
        (theData as ITransactionItem[])?.map(
          ({ id, name, date, amount, category, source, type }) => (
            <TransactionCard
              link
              key={id}
              id={id}
              name={name}
              type={type}
              amount={amount}
              date={date}
              category={category}
              source={source}
            />
          )
        )}
    </Stack>
  );
};
