import { useCategoriesCreate } from '@/hooks';
import { CollectionForm } from '../CollectionForm';
import { Category } from '@/core';

export const CreateCategory: React.FC = () => {
  const { mutateAsync } = useCategoriesCreate({});

  return (
    <CollectionForm
      route="categories"
      inputTypes={Category.inputTypes}
      inputValidation={Category.inputValidation}
      onSubmit={mutateAsync}
      options={{
        icon: [
          { label: 'Category', value: 'MdCategory' },
          { label: 'Add', value: 'MdAdd' },
          { label: 'Close', value: 'MdClose' },
        ],
      }}
    />
  );
};
