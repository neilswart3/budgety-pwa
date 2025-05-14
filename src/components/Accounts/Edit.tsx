import { Account, ICollectionPayload } from '@/core';
import { useAccountsItem, useAccountsUpdate } from '@/hooks';
import { EditLayout } from '@/layouts';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { CollectionForm } from '../CollectionForm';

export const EditAccount: React.FC = () => {
  const { account } = useParams();
  const { data, isFetching } = useAccountsItem(account as string);
  const { mutateAsync } = useAccountsUpdate({});

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
        route="accounts"
        initValues={data}
        inputTypes={Account.inputTypes}
        inputValidation={Account.inputValidation}
        onSubmit={handleSubmit}
      />
    </EditLayout>
  );
};
