import { ITransactionItem, useTransactions } from '@/old/core';
import { TransactionCard } from '@/old/components/ui';
import { Stack } from '@chakra-ui/react';

interface Props {
  categoryId?: string;
}

export const TransactionsList: React.FC<Props> = ({ categoryId }) => {
  const { data, isLoading } = useTransactions.search({ category: categoryId });

  return (
    <Stack gap={4}>
      {!data &&
        isLoading &&
        Array.from({ length: 9 }).map((_, i) => (
          <TransactionCard.Loading key={`transactions-list-placeholder-${i}`} />
        ))}

      {!!(data as ITransactionItem[])?.length &&
        (data as ITransactionItem[])?.map(
          ({ id, name, date, amount, category, account, type }) => (
            <TransactionCard
              link
              key={id}
              id={id}
              name={name}
              type={type}
              amount={amount}
              date={date}
              category={category}
              account={account}
            />
          )
        )}
    </Stack>
  );
};
