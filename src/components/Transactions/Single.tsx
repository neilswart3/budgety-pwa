import { ITransactionItem, useTransactions } from '@/core';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router';
import { TransactionCard } from '../ui';
import { getFormattedDate } from '@/utils';
import Case from 'case';

export const SingleTransaction: React.FC = () => {
  const { transaction: id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useTransactions.query<ITransactionItem>(id);
  const { deleteItem } = useTransactions.mutation({
    onSuccess: () => navigate('/transactions'),
  });

  const handleDelete = useCallback(async () => {
    try {
      await deleteItem.mutateAsync(id as string);
    } catch (error) {
      console.log('error:', error);
    }
  }, [id, navigate]);

  return (
    <Stack gap={8}>
      {!data && isFetching && <TransactionCard.Loading />}
      {!!data && (
        <TransactionCard
          id={data?.id}
          date={data.date}
          source={data.source}
          name={data.name}
          type={data.type}
          amount={data.amount}
          category={data.category}
        />
      )}

      <Stack>
        {Object.entries({
          fullName: data.name,
          type: data.type,
          source: data.source,
          date: getFormattedDate(data.date, 'd MMMM y - t'),
          salaryMonth: getFormattedDate(data.salaryMonth, 'MMMM y'),
          createdOn: getFormattedDate(data.created, 'd MMMM y - t'),
          lastModified: getFormattedDate(data.modified, 'd MMMM y - t'),
          createdBy: data.createdBy,
          description: data.description,
          location: data.location,
        }).map(([k, v]) => (
          <HStack key={k}>
            <Text fontWeight="black">{Case.title(k)}:</Text>
            <Text>{Case.title(v)}</Text>
          </HStack>
        ))}
      </Stack>

      <HStack>
        <Button {...{ as: Link, to: 'edit' }}>
          <IoPencilSharp />
          Edit
        </Button>
        <Button colorPalette="red" onClick={handleDelete}>
          <IoTrashBinSharp />
          Delete
        </Button>
      </HStack>
    </Stack>
  );
};
