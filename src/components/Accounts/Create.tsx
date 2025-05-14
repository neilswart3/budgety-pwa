import { Account } from '@/core';
import { useAccountsCreate } from '@/hooks';
import { CollectionForm } from '../CollectionForm';

export const CreateAccount: React.FC = () => {
  const { mutateAsync } = useAccountsCreate({});

  return (
    <CollectionForm
      route="accounts"
      inputTypes={Account.inputTypes}
      inputValidation={Account.inputValidation}
      onSubmit={mutateAsync}
    />
  );
};
