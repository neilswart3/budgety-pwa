import { InputTypesValues } from '@/core/models/CollectionItem/types';
import { Field, Input, Textarea } from '@chakra-ui/react';
import { ChangeEvent, ReactElement } from 'react';

interface Props {
  name: string;
  label: string | ReactElement;
  value: string;
  type: InputTypesValues;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const InputField: React.FC<Props> = ({
  name,
  label,
  value,
  type,
  onChange,
}) => (
  <>
    <Field.Label>{label}</Field.Label>
    {type === 'textarea' ? (
      <Textarea name={name} value={value} onChange={onChange} />
    ) : (
      <Input type={type} name={name} onChange={onChange} value={value} />
    )}
  </>
);
