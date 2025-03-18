import { useTransactions } from '@/core';
import { Button, HStack, Stack } from '@chakra-ui/react';
import { useCallback } from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';

export const SingleTransaction: React.FC = () => {
  const { transaction: id } = useParams();
  const { data } = useTransactions.query(id);
  const { deleteItem } = useTransactions.mutation({
    onSuccess: () => navigate('/transactions'),
  });
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    try {
      await deleteItem.mutateAsync(id as string);
    } catch (error) {
      console.log('error:', error);
    }
  }, [id, navigate]);

  return (
    <Stack>
      Single Transaction Component
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <HStack>
        <Button>
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
