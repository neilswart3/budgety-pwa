import { useCallback } from 'react';
import { ITransactionFormValues, TransactionForm } from '../ui';
import {
  IBaseModelPayload,
  ITransactionItem,
  useTransactions,
} from '@/old/core';
import { useNavigate, useParams } from 'react-router';

export const EditTransaction: React.FC = () => {
  const navigate = useNavigate();
  const { transaction: id } = useParams();
  const { data, isFetching } = useTransactions.single(id as string);
  const { updateItem } = useTransactions.mutation({
    onSuccess: () => navigate(`/transactions/${id}`),
  });

  const handleSubmit = useCallback(
    async (values: ITransactionFormValues) => {
      try {
        if (!data?.id) throw new Error('EditTransaction: id is not defined');

        await updateItem.mutateAsync({
          id: data?.id,
          ...values,
        } as unknown as IBaseModelPayload<ITransactionItem>);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [data?.id, updateItem]
  );

  if (!data && isFetching) return <div>Loading</div>;

  if (!data) return <div>Not found</div>;

  return (
    <TransactionForm
      initValues={{
        type: data.type,
        name: data.name,
        user: data.user,
        category: data.category,
        account: data.account,
        occurrence: data.occurrence,
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
