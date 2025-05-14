import { useOccasionsDelete, useOccasionsItem } from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';

export const SingleOccasion: React.FC = () => {
  const { occasion } = useParams();

  const { data, isFetching } = useOccasionsItem(occasion as string);
  const { mutateAsync } = useOccasionsDelete('id');

  return (
    <SingleLayout
      id={data?.id}
      route="occasion"
      loading={!data && isFetching}
      onMutate={mutateAsync}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </SingleLayout>
  );
};
