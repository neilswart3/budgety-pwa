import { useAccountsDelete, useAccountsItem } from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';

export const SingleAccount: React.FC = () => {
  const { account } = useParams();

  const { data, isFetching } = useAccountsItem(account as string);
  const { mutateAsync } = useAccountsDelete('id');

  return (
    <SingleLayout
      id={data?.id}
      route="accounts"
      loading={!data && isFetching}
      onMutate={mutateAsync}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </SingleLayout>
  );
};
