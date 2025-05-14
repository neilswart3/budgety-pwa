import { useTransactionsDelete, useTransactionsItem } from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';

export const SingleTransaction: React.FC = () => {
  const { transaction } = useParams();

  const { data, isFetching } = useTransactionsItem(transaction as string);
  const { mutateAsync } = useTransactionsDelete('id');

  return (
    <SingleLayout
      id={data?.id}
      route="transactions"
      loading={!data && isFetching}
      onMutate={mutateAsync}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </SingleLayout>
  );
};
