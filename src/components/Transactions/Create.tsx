import { useTransactionsCreate } from '@/hooks';
import { CollectionForm } from '../CollectionForm';
import { Transaction } from '@/core';
import { TransactionType } from '@/core/models/Transaction/types';

export const CreateTransaction: React.FC = () => {
  const { mutateAsync } = useTransactionsCreate({});

  return (
    <CollectionForm
      route="transactions"
      inputTypes={Transaction.inputTypes}
      inputValidation={Transaction.inputValidation}
      onSubmit={mutateAsync}
      options={{
        categories: [
          { label: 'fake category 0', value: 'fake-category-0' },
          { label: 'fake category 1', value: 'fake-category-1' },
          { label: 'fake category 2', value: 'fake-category-2' },
        ],
        accounts: [{ label: 'fake account', value: 'fake-accounts' }],
        occasion: [{ label: 'fake occasion', value: 'fake-occasion' }],
        type: [
          { value: TransactionType.EXPENSE, label: 'Expense' },
          { value: TransactionType.INCOME, label: 'Income' },
        ],
      }}
    />
  );
};
