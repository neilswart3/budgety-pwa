import { useSavingsList } from '@/hooks';
import { ListLayout } from '@/layouts';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

export const ListSavings: React.FC = () => {
  const { data, isFetching } = useSavingsList();

  return (
    <ListLayout loading={!data && isFetching}>
      <Stack>
        {data?.map(({ id, name, goalAmount, goalDate }) => (
          <div key={id}>
            <pre>{JSON.stringify({ name, goalAmount, goalDate }, null, 2)}</pre>
            <Button {...{ as: Link, to: id }} variant="ghost">
              Go there
            </Button>
          </div>
        ))}
      </Stack>
    </ListLayout>
  );
};
