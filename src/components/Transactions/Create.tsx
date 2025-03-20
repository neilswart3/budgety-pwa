import { useCallback } from 'react';
import { ITransactionFormValues, TransactionForm } from '@/components/ui';
import { useNavigate } from 'react-router';
import { TransactionItemTypeField, useTransactions } from '@/core';

const initValues: ITransactionFormValues = {
  name: '',
  description: '',
  date: new Date(),
  salaryMonth: new Date(),
  amount: 0,
  category: 'food',
  location: '',
  source: 'maaltijd cheques',
  user: 'me',
  type: TransactionItemTypeField.EXPENSE,
};

export const CreateTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { createItem } = useTransactions.mutation({
    onSuccess: () => {
      navigate('/transactions');
    },
  });

  const handleSubmit = useCallback(
    async (values: ITransactionFormValues) => {
      try {
        await createItem.mutateAsync(values);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [createItem]
  );

  return <TransactionForm initValues={initValues} onSubmit={handleSubmit} />;
};
