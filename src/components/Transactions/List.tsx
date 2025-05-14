import { useTransactionsList } from '@/hooks';
import { ListLayout } from '@/layouts';
import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

export const ListTransactions: React.FC = () => {
  const { data, isFetching } = useTransactionsList();

  return (
    <ListLayout loading={!data && isFetching}>
      <Stack>
        {data?.map(({ id, name, type, amount, date, salaryMonth }) => (
          <div key={id}>
            <pre>
              {JSON.stringify(
                { name, type, amount, date, salaryMonth },
                null,
                2
              )}
            </pre>
            <Button {...{ as: Link, to: id }} variant="ghost">
              Go there
            </Button>
          </div>
        ))}
      </Stack>
    </ListLayout>
  );
};
