import { useCallback } from 'react';
import { ITransactionFormValues, TransactionForm } from '@/old/components/ui';
import { useNavigate } from 'react-router';
import {
  IBaseModelPayload,
  ITransactionItem,
  TransactionItemTypeField,
  useTransactions,
} from '@/old/core';

export const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { createItem } = useTransactions.mutation({
    onSuccess: () => navigate('/transactions'),
  });

  const handleSubmit = useCallback(
    async (values: ITransactionFormValues) => {
      try {
        await createItem.mutateAsync(
          values as unknown as IBaseModelPayload<ITransactionItem>
        );
      } catch (error) {
        console.log('error:', error);
      }
    },
    [createItem]
  );

  return (
    <TransactionForm
      onSubmit={handleSubmit}
      initValues={{
        name: '',
        description: '',
        date: new Date(),
        salaryMonth: new Date(),
        amount: 0,
        category: '',
        location: '',
        account: 'maaltijd cheques',
        occurrence: '',
        user: 'me',
        type: TransactionItemTypeField.EXPENSE,
      }}
    />
  );
};
