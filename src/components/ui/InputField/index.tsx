import { InputTypesValues } from '@/core/models/CollectionItem/types';
import { Field, Input, Textarea } from '@chakra-ui/react';
import { ReactElement } from 'react';

interface Props {
  name: string;
  label: string | ReactElement;
  value: string;
  type: InputTypesValues;
}

export const InputField: React.FC<Props> = ({ name, label, value, type }) => {
  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      {type === 'textarea' ? (
        <Textarea name={name} value={value} />
      ) : (
        <Input
          type={type}
          name={name}
          {...(type === 'currencyNumber'
            ? { value: parseFloat('0').toFixed(2) }
            : { value })}
        />
      )}
    </Field.Root>
  );
};
