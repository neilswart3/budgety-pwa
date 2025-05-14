import { Button, HStack, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router';

interface Props extends PropsWithChildren {
  loading: boolean;
}

export const ListLayout: React.FC<Props> = ({ children, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <Stack>
      <HStack>
        <Button {...{ as: Link, to: 'create' }}>Create new</Button>
      </HStack>
      <Stack>{children}</Stack>
    </Stack>
  );
};
