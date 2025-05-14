import { useOccasionsCreate } from '@/hooks';
import { CollectionForm } from '../CollectionForm';
import { Occasion } from '@/core';

export const CreateOccasion: React.FC = () => {
  const { mutateAsync } = useOccasionsCreate({});

  return (
    <CollectionForm
      route="occasions"
      inputTypes={Occasion.inputTypes}
      inputValidation={Occasion.inputValidation}
      onSubmit={mutateAsync}
      options={{
        categories: [
          { label: 'fake category 0', value: 'fake-category-0' },
          { label: 'fake category 1', value: 'fake-category-1' },
          { label: 'fake category 2', value: 'fake-category-2' },
        ],
      }}
    />
  );
};
