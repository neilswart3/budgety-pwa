import {
  useAccountsList,
  useCategoriesList,
  useOccasionsList,
  useSubCategoriesSearch,
  useTransactionsCreate,
} from '@/hooks';
import { CollectionForm } from '../CollectionForm';
import {
  IAccount,
  ICategory,
  IOccasion,
  ISubCategory,
  Transaction,
} from '@/core';
import { TransactionType } from '@/core/models/Transaction/types';
import { useCallback, useMemo, useState } from 'react';
import { getFormOptions } from '@/utils';

export const CreateTransaction: React.FC = () => {
  const { mutateAsync } = useTransactionsCreate({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = useCategoriesList();
  const categoryOptions = useMemo(
    () => getFormOptions<ICategory>(categories.data),
    [categories.data]
  );

  const subCategories = useSubCategoriesSearch({
    category: [selectedCategory],
  });
  const subCategoryOptions = useMemo(
    () => getFormOptions<ISubCategory>(subCategories.data),
    [subCategories.data]
  );

  const accounts = useAccountsList();
  const accountOptions = useMemo(
    () => getFormOptions<IAccount>(accounts.data),
    [accounts.data]
  );

  const occasions = useOccasionsList();
  const occasionsOptions = useMemo(() => {
    return getFormOptions<IOccasion>(occasions.data);
  }, [occasions.data]);

  const handleChange = useCallback(
    ({ name, value }: { name: string; value: string | string[] | number }) => {
      if (name !== 'category') return;

      setSelectedCategory(value ? (value as string) : '');
    },
    []
  );

  return (
    <CollectionForm
      route="transactions"
      inputTypes={Transaction.inputTypes}
      inputValidation={Transaction.inputValidation}
      onChange={handleChange}
      onSubmit={mutateAsync}
      options={{
        category: categoryOptions,
        subCategories: subCategoryOptions,
        accounts: accountOptions,
        occasion: occasionsOptions,
        type: [
          { value: TransactionType.EXPENSE, label: 'Expense' },
          { value: TransactionType.INCOME, label: 'Income' },
        ],
      }}
    />
  );
};
