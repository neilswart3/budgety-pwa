import { Button, HStack, Stack } from '@chakra-ui/react';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { PropsWithChildren, useCallback } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';

interface Props extends PropsWithChildren {
  id: string | undefined;
  route: string;
  loading: boolean;
  onMutate: UseMutateAsyncFunction<void, Error, unknown, unknown>;
}

export const SingleLayout: React.FC<Props> = ({
  id,
  route,
  loading,
  children,
  onMutate,
}) => {
  const navigate = useNavigate();

  const handleDelete = useCallback(async () => {
    try {
      if (!id) return;

      await onMutate(id, { onSuccess: () => navigate(`/${route}`) });
    } catch (error) {
      console.log('error:', error);
    }
  }, [id, navigate, onMutate, route]);

  if (loading) return <div>Loading ...</div>;

  return (
    <Stack gap={8}>
      <Stack>{children}</Stack>
      <HStack gap={4}>
        <Button {...{ as: Link, to: 'edit' }}>
          <MdEdit />
          Edit
        </Button>
        <Button onClick={handleDelete}>
          <MdDelete />
          Delete
        </Button>
      </HStack>
    </Stack>
  );
};
