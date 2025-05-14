import { ICollectionPayload, Transaction } from '@/core';
import { useTransactionsItem, useTransactionsUpdate } from '@/hooks';
import { EditLayout } from '@/layouts';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { CollectionForm } from '../CollectionForm';

export const EditTransaction: React.FC = () => {
  const { transaction } = useParams();
  const { data, isFetching } = useTransactionsItem(transaction as string);
  const { mutateAsync } = useTransactionsUpdate({});

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
        route="transactions"
        initValues={data}
        inputTypes={Transaction.inputTypes}
        inputValidation={Transaction.inputValidation}
        onSubmit={handleSubmit}
        options={{
          categories: [
            { label: 'fake category 0', value: 'fake-category-0' },
            { label: 'fake category 1', value: 'fake-category-1' },
            { label: 'fake category 2', value: 'fake-category-2' },
          ],
          accounts: [{ label: 'fake account', value: 'fake-accounts' }],
          occasion: [{ label: 'fake occasion', value: 'fake-occasion' }],
        }}
      />
    </EditLayout>
  );
};
