import { ICollectionPayload, Occasion } from '@/core';
import { useOccasionsItem, useOccasionsUpdate } from '@/hooks';
import { EditLayout } from '@/layouts';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { CollectionForm } from '../CollectionForm';

export const EditOccasion: React.FC = () => {
  const { occasion } = useParams();
  const { data, isFetching } = useOccasionsItem(occasion as string);
  const { mutateAsync } = useOccasionsUpdate({});

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
        route="occasions"
        initValues={data}
        inputTypes={Occasion.inputTypes}
        inputValidation={Occasion.inputValidation}
        onSubmit={handleSubmit}
        options={{
          categories: [
            { label: 'fake category 0', value: 'fake-category-0' },
            { label: 'fake category 1', value: 'fake-category-1' },
            { label: 'fake category 2', value: 'fake-category-2' },
          ],
        }}
      />
    </EditLayout>
  );
};
