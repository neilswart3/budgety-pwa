import { useSavingsDelete, useSavingsItem } from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';

export const SingleSaving: React.FC = () => {
  const { saving } = useParams();

  const { data, isFetching } = useSavingsItem(saving as string);
  const { mutateAsync } = useSavingsDelete('id');

  return (
    <SingleLayout
      id={data?.id}
      route="savings"
      loading={!data && isFetching}
      onMutate={mutateAsync}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </SingleLayout>
  );
};
