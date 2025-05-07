import {
  //   AccountItemModel,
  //   ICollectionModels,
  TransactionItemModel,
} from '@/core';
// import { useState } from 'react';

interface Props {
  values: object;
  options: object;
  inputTypes: typeof TransactionItemModel.inputTypes;
}

export const CollectionFormInputs: React.FC<Props> = ({
  values: initValues,
  options,
  inputTypes,
}) => {
  console.log('initValues:', initValues);
  console.log('options:', options);
  console.log('inputTypes:', inputTypes);

  return <div>CollectionFormInputs Component</div>;
};
