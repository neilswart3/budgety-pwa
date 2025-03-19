import { useCallback } from 'react';
import { TransactionForm } from '../ui';
import {
  IBaseTransactionItem,
  ITransactionItem,
  useTransactions,
} from '@/core';
import { useNavigate, useParams } from 'react-router';

export const EditTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { transaction: id } = useParams();
  const { data, isFetching } = useTransactions.query<ITransactionItem>(id);
  const { updateItem } = useTransactions.mutation({
    onSuccess: () => navigate(`/transactions/${id}`),
  });

  const handleSubmit = useCallback(
    async (values: IBaseTransactionItem) => {
      try {
        if (!data?.id) throw new Error('EditTransaction: id is not defined');

        await updateItem.mutateAsync({ id: data.id, ...values });
      } catch (error) {
        console.log('error:', error);
      }
    },
    [data?.id, updateItem]
  );

  if (!data && isFetching) return <div>Loading</div>;

  return (
    <TransactionForm
      initValues={{
        type: data.type,
        name: data.name,
        user: data.user,
        category: data.category,
        source: data.source,
        amount: data.amount,
        location: data.location,
        description: data.description,
        date: data.date,
        salaryMonth: data.salaryMonth,
      }}
      onSubmit={handleSubmit}
    />
  );
};
