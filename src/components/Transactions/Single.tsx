import { ITransactionItem, useTransactions } from '@/core';
import { Button, HStack, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router';
import { TransactionCard } from '../ui';
import { getFormattedDate } from '@/utils';
import Case from 'case';

export const SingleTransaction: React.FC = () => {
  const { transaction: id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useTransactions.query<ITransactionItem>(id);
  const loading = useMemo(() => !data && isFetching, [data, isFetching]);

  const { deleteItem } = useTransactions.mutation({
    onSuccess: () => navigate('/transactions'),
  });

  const handleDelete = useCallback(async () => {
    try {
      await deleteItem.mutateAsync(id as string);
    } catch (error) {
      console.log('error:', error);
    }
  }, [deleteItem, id]);

  return (
    <Stack gap={8}>
      <>
        {loading && <TransactionCard.Loading />}
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
      </>

      <HStack>
        <Button disabled={loading} {...{ as: Link, to: 'edit' }}>
          <IoPencilSharp />
          Edit
        </Button>
        <Button disabled={loading} colorPalette="red" onClick={handleDelete}>
          <IoTrashBinSharp />
          Delete
        </Button>
      </HStack>

      <Stack gap={4}>
        {Object.entries({
          fullName: data?.name,
          type: data?.type,
          source: data?.source,
          date: getFormattedDate(data?.date, 'd MMMM y - t'),
          salaryMonth: getFormattedDate(data?.salaryMonth, 'MMMM y'),
          createdOn: getFormattedDate(data?.created, 'd MMMM y - t'),
          lastModified: getFormattedDate(data?.modified, 'd MMMM y - t'),
          createdBy: data?.createdBy,
          location: data?.location,
          description: data?.description,
        }).map(([k, v]) => (
          <Stack key={k}>
            <Text fontWeight="black">{Case.title(k)}:</Text>
            {loading && <Skeleton h={6} w="full" />}
            {!!data && <Text>{Case.title(v)}</Text>}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
