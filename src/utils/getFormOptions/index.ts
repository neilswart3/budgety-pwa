import { SelectOption } from '@/components/ui';
import { CollectionItems } from '@/core';
import Case from 'case';

export const getFormOptions = <T extends CollectionItems>(
  data: T[] | undefined
): SelectOption[] => {
  if (!data?.length) return [];

  return data.reduce<SelectOption[]>(
    (acc, { id, name }) => [...acc, { value: id, label: Case.title(name) }],
    []
  );
};
