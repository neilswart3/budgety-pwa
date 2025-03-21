import { IBaseCategoryItem, IBaseCollectionItem } from '@/core';
import { useForm, UseFormHandleChangePayload } from '@/hooks';
import { Form } from '../Form';
import { IoSaveSharp } from 'react-icons/io5';
import Case from 'case';
import { FormInput } from '../FormInput';
import { ChangeEvent, useCallback } from 'react';

export type ICategoryFormValues = IBaseCategoryItem &
  Pick<IBaseCollectionItem, 'name'>;

interface Props {
  initValues: ICategoryFormValues;
  onSubmit: (values: ICategoryFormValues) => Promise<void>;
}

export const CategoryForm: React.FC<Props> = ({ initValues, onSubmit }) => {
  const fields: Record<'basicInfo', (keyof ICategoryFormValues)[]> = {
    basicInfo: ['name', 'description'],
  };

  const {
    values,
    handleChange: onChange,
    handleSubmit,
  } = useForm({
    initValues,
    onSubmit,
  });

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({
        target: { name: target.name, value: target.value },
      } as UseFormHandleChangePayload<ICategoryFormValues>),
    [onChange]
  );

  return (
    <Form.Container
      onSubmit={handleSubmit}
      button={
        <>
          <IoSaveSharp />
          Submit
        </>
      }
    >
      {Object.entries(fields).map(([name, keys]) => (
        <Form.Block key={name} title={Case.title(name)}>
          {keys.map((key) => (
            <FormInput
              key={key}
              name={key}
              value={values[key as keyof ICategoryFormValues]}
              onChange={handleChange}
            />
          ))}
        </Form.Block>
      ))}
    </Form.Container>
  );
};
