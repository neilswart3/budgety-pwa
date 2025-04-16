import { useCategories, useTransactions } from '@/core';
import { Button, DataList, HStack, Skeleton, Stack } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { Link, useNavigate, useParams } from 'react-router';
import { TransactionCard } from '../ui';
import { getFormattedDate } from '@/utils';
import Case from 'case';

export const SingleTransaction: React.FC = () => {
  const { transaction: id } = useParams();
  const navigate = useNavigate();

  const transaction = useTransactions.single(id as string);
  const category = useCategories.single(transaction?.data?.category);

  const loading = useMemo(
    () =>
      !transaction.data &&
      transaction.isFetching &&
      !category.data &&
      category.isFetching,
    [
      category.data,
      category.isFetching,
      transaction.data,
      transaction.isFetching,
    ]
  );

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
        {!!transaction.data && (
          <TransactionCard
            id={transaction?.data?.id}
            date={transaction?.data?.date}
            source={transaction?.data?.source}
            name={transaction?.data?.name}
            type={transaction?.data?.type}
            amount={transaction?.data?.amount}
            category={transaction?.data?.category}
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

      <DataList.Root orientation="horizontal">
        {Object.entries({
          fullName: transaction?.data?.name,
          type: transaction?.data?.type,
          category: category?.data?.name || '',
          source: transaction?.data?.source,
          date: getFormattedDate(transaction?.data?.date, 'd MMMM y - t'),
          salaryMonth: getFormattedDate(
            transaction?.data?.salaryMonth,
            'MMMM y'
          ),
          createdOn: getFormattedDate(
            transaction?.data?.created,
            'd MMMM y - t'
          ),
          lastModified: getFormattedDate(
            transaction?.data?.modified,
            'd MMMM y - t'
          ),
          createdBy: transaction?.data?.createdBy,
          location: transaction?.data?.location,
          description: transaction?.data?.description,
        }).map(([k, v]) => (
          <DataList.Item
            key={k}
            {...(['description'].includes(k)
              ? { flexDirection: 'column', alignItems: 'start' }
              : {})}
          >
            <DataList.ItemLabel>{Case.title(k)}</DataList.ItemLabel>
            <DataList.ItemValue>
              {loading && <Skeleton h={6} w="full" />}
              {(!!transaction?.data && v) ?? Case.title(`${v}`)}
            </DataList.ItemValue>
          </DataList.Item>
        ))}
      </DataList.Root>
    </Stack>
  );
};
