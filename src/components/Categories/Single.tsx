import { useCategoriesDelete, useCategoriesItem } from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';

export const SingleCategory: React.FC = () => {
  const { category } = useParams();

  const { data, isFetching } = useCategoriesItem(category as string);
  const { mutateAsync } = useCategoriesDelete('id');

  return (
    <SingleLayout
      id={data?.id}
      route="categories"
      loading={!data && isFetching}
      onMutate={mutateAsync}
    >
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </SingleLayout>
  );
};
