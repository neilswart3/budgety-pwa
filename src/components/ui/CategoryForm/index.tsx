import { IBaseCategoryItem, IBaseCollectionItem, themeSystem } from '@/core';
import { useForm, UseFormHandleChangePayload } from '@/hooks';
import { Form } from '../Form';
import { IoSaveSharp } from 'react-icons/io5';
import Case from 'case';
import { FormInput, FormInputOption } from '../FormInput';
import { ChangeEvent, useCallback, useMemo } from 'react';
import * as io5Icons from 'react-icons/io5';
import { Box, HStack, Icon } from '@chakra-ui/react';

export type ICategoryFormValues = IBaseCategoryItem &
  Pick<IBaseCollectionItem, 'name'>;

interface Props {
  initValues: ICategoryFormValues;
  onSubmit: (values: ICategoryFormValues) => Promise<void>;
}

export const CategoryForm: React.FC<Props> = ({ initValues, onSubmit }) => {
  const fields: Record<'basicInfo' | 'display', (keyof ICategoryFormValues)[]> =
    {
      display: ['icon', 'color'],
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

  const iconOptions = useMemo(
    () =>
      Object.entries(io5Icons).map(([id, IconValue]) => ({
        id,
        value: id,
        label: (
          <HStack>
            <Icon size="lg">
              <IconValue />
            </Icon>
            {Case.title(id.replace('Io', ''))}
          </HStack>
        ),
      })),
    []
  );

  const colorOptions = useMemo(() => {
    return Object.keys(
      themeSystem?._config?.theme?.tokens?.colors || {}
    ).reduce<FormInputOption[]>(
      (acc, key) =>
        [
          'transparent',
          'current',
          'black',
          'white',
          'whiteAlpha',
          'blackAlpha',
        ].includes(key)
          ? acc
          : [
              ...acc,
              {
                id: key,
                value: key,
                label: (
                  <HStack>
                    <Box h={4} w={4} bg={`${key}.500`} borderRadius="sm" />
                    {Case.title(key)}
                  </HStack>
                ),
              },
            ],
      []
    );
  }, []);

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
              options={
                key === 'icon'
                  ? iconOptions
                  : key === 'color'
                  ? colorOptions
                  : undefined
              }
            />
          ))}
        </Form.Block>
      ))}
    </Form.Container>
  );
};
