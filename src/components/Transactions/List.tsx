import { ITransactionItem, useTransactions } from '@/core';
import { TransactionCard } from '@/components/ui';
import { Stack } from '@chakra-ui/react';

export const TransactionsList: React.FC = () => {
  const { data, isLoading } = useTransactions.query();

  return (
    <Stack gap={4}>
      {!data &&
        isLoading &&
        Array.from({ length: 9 }).map((_, i) => (
          <TransactionCard.Loading key={`transactions-list-placeholder-${i}`} />
        ))}

      {(data as ITransactionItem[])?.length &&
        (data as ITransactionItem[])?.map(
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
