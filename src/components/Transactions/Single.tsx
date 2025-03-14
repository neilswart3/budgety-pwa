import { ITransactionItem, TransactionCollection } from '@/core';
import { Button, HStack, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router';

export const SingleTransaction: React.FC = () => {
  const [item, setItem] = useState<ITransactionItem | undefined>(undefined);
  const { transaction: id } = useParams();
  const navigate = useNavigate();

  const storage = useMemo(() => new TransactionCollection(), []);

  const fetchTransaction = useCallback(async () => {
    try {
      const res = await storage.fetchItem(id as string);

      setItem(res as ITransactionItem);
    } catch (error) {
      console.log('error:', error);
    }
  }, [id, storage]);

  const handleDelete = useCallback(async () => {
    try {
      await storage.deleteItem(id as string);

      navigate('/transactions');
    } catch (error) {
      console.log('error:', error);
    }
  }, [id, navigate, storage]);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  return (
    <Stack>
      Single Transaction Component
      <pre>{JSON.stringify(item, null, 2)}</pre>
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
