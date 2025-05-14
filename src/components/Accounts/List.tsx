import { useAccountsList } from '@/hooks';
import { ListLayout } from '@/layouts';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

export const ListAccounts: React.FC = () => {
  const { data, isFetching } = useAccountsList();

  return (
    <ListLayout loading={!data && isFetching}>
      <Stack>
        {data?.map(({ id, name, amount, monthBudget }) => (
          <div key={id}>
            <pre>{JSON.stringify({ name, amount, monthBudget }, null, 2)}</pre>
            <Button {...{ as: Link, to: id }} variant="ghost">
              Go there
            </Button>
          </div>
        ))}
      </Stack>
    </ListLayout>
  );
};
