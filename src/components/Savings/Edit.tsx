import { ICollectionPayload, Saving } from '@/core';
import { CollectionForm } from '../CollectionForm';
import { useSavingsItem, useSavingsUpdate } from '@/hooks';
import { useParams } from 'react-router';
import { useCallback } from 'react';
import { EditLayout } from '@/layouts';

export const EditSaving: React.FC = () => {
  const { saving } = useParams();
  const { data, isFetching } = useSavingsItem(saving as string);
  const { mutateAsync } = useSavingsUpdate({});

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
        route="savings"
        initValues={data}
        inputTypes={Saving.inputTypes}
        inputValidation={Saving.inputValidation}
        onSubmit={handleSubmit}
        options={{ icon: [{ label: 'Savings', value: 'MdSavings' }] }}
      />
    </EditLayout>
  );
};
