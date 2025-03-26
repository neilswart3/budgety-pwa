import { useCategories, useTransactions } from '@/core';
import { Button, HStack, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import Case from 'case';
import { getFormattedDate } from '@/utils';
import { Transactions } from '@/components';
import { Tabs, CategoryCard } from '@/components/ui';

export const SingleCategory: React.FC = () => {
  const { category: id } = useParams();
  const navigate = useNavigate();

  const { data, isFetching } = useCategories.single(id);
  const loading = useMemo(() => !data && isFetching, [data, isFetching]);

  const { deleteItem } = useTransactions.mutation({
    onSuccess: () => navigate('/categories'),
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
      {loading && <CategoryCard.Loading />}
      {!!data && (
        <CategoryCard
          id={data?.id}
          name={data?.name}
          description={data?.description}
          icon={data?.icon}
          color={data?.color}
        />
      )}

      <HStack>
        <Button disabled={loading} flex={1} {...{ as: Link, to: 'edit' }}>
          <IoPencilSharp />
          Edit
        </Button>
        <Button
          disabled={loading}
          flex={1}
          colorPalette="red"
          onClick={handleDelete}
        >
          <IoTrashBinSharp />
          Delete
        </Button>
      </HStack>

      <Tabs
        data={[
          {
            id: 'transactions',
            label: 'Transactions',
            content: <Transactions.List categoryId={id} />,
          },
          {
            id: 'details',
            label: 'Details',
            content: (
              <Stack gap={4}>
                {Object.entries({
                  fullName: data?.name,
                  description: data?.description,
                  createdOn: getFormattedDate(data?.created, 'd MMMM y - t'),
                  lastModified: getFormattedDate(
                    data?.modified,
                    'd MMMM y - t'
                  ),
                  createdBy: data?.createdBy,
                }).map(([k, v]) => (
                  <Stack key={k}>
                    <Text fontWeight="black">{Case.title(k)}:</Text>
                    {loading && <Skeleton h={6} w="full" />}
                    {(!!data && v) ?? <Text>{Case.title(`${v}`)}</Text>}
                  </Stack>
                ))}
              </Stack>
            ),
          },
        ]}
      />
    </Stack>
  );
};
