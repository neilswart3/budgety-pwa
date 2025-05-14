import { Category, ICollectionPayload } from '@/core';
import { useCategoriesItem, useCategoriesUpdate } from '@/hooks';
import { EditLayout } from '@/layouts';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { CollectionForm } from '../CollectionForm';

export const EditCategory: React.FC = () => {
  const { category } = useParams();
  const { data, isFetching } = useCategoriesItem(category as string);
  const { mutateAsync } = useCategoriesUpdate({});

  const handleSubmit = useCallback(
    async (values: ICollectionPayload): Promise<void> => {
      try {
        await mutateAsync({ ...data, ...values });
      } catch (error) {
        console.log('error:', error);
      }
    },
    [data, mutateAsync]
  );

  return (
    <EditLayout loading={!data && isFetching}>
      <CollectionForm
        route="categories"
        initValues={data}
        inputTypes={Category.inputTypes}
        inputValidation={Category.inputValidation}
        onSubmit={handleSubmit}
        options={{ icon: [{ label: 'Category', value: 'MdCategory' }] }}
      />
    </EditLayout>
  );
};
