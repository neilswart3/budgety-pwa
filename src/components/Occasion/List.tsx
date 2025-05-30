import { useOccasionsList } from '@/hooks';
import { ListLayout } from '@/layouts';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

export const ListOccasions: React.FC = () => {
  const { data, isFetching } = useOccasionsList();

  return (
    <ListLayout loading={!data && isFetching}>
      <Stack>
        {data?.map(({ id, name }) => (
          <div key={id}>
            <pre>{JSON.stringify({ name }, null, 2)}</pre>
            <Button {...{ as: Link, to: id }} variant="ghost">
              Go there
            </Button>
          </div>
        ))}
      </Stack>
    </ListLayout>
  );
};
