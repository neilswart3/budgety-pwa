import { InputTypes } from '@/core/models/CollectionItem/types';

interface GetFormInitValuesPayload {
  values: object | undefined;
  inputTypes: InputTypes<object>;
}

export const getFormInitValues = ({
  values,
  inputTypes,
}: GetFormInitValuesPayload) => {
  if (!values) return undefined;

  return Object.keys(inputTypes).reduce(
    (acc, key) => ({ ...acc, [key]: values[key as keyof typeof values] }),
    {}
  );
};
