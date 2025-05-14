import { Saving } from '@/core';
import { CollectionForm } from '../CollectionForm';
import { useSavingsCreate } from '@/hooks';

export const CreateSaving: React.FC = () => {
  const { mutateAsync } = useSavingsCreate({});

  return (
    <CollectionForm
      route="savings"
      inputTypes={Saving.inputTypes}
      inputValidation={Saving.inputValidation}
      onSubmit={mutateAsync}
      options={{ icon: [{ label: 'Savings', value: 'MdSavings' }] }}
    />
  );
};
