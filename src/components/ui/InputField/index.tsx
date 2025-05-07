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
  console.log('InputField value:', value);

  return (
    <Field.Root>
      <Field.Label>{label}</Field.Label>
      {type === 'textarea' ? (
        <Textarea name={name} />
      ) : (
        <Input
          type={type}
          name={name}
          {...(type === 'currencyNumber'
            ? { value: parseFloat('0').toFixed(2) }
            : {})}
        />
      )}
    </Field.Root>
  );
};
