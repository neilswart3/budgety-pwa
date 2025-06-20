import {
  InputTypes,
  InputTypesValues,
  InputValidations,
} from '@/core/models/CollectionItem/types';
import { Button, Field, HStack, Stack } from '@chakra-ui/react';
import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { EnumField, InputField, SelectField, SelectFieldType } from '../ui';
import Case from 'case';
import { MdClose, MdSave } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { z, ZodError } from 'zod';
import { getFormEmptyValues, getParsedSubmitValues } from './utils';
import { getFormInitValues } from './utils/getFormInitValues';
import { ICollectionPayload } from '@/core';

interface Options {
  label: string;
  value: string;
}

type CollectionFormSelectOptionsMap<T extends object = object> = {
  [key in keyof T]: Options[];
};

type Values = ICollectionPayload;

interface CollectionFormProps<T extends object = object> {
  route: string;
  inputTypes: InputTypes<T>;
  inputValidation: InputValidations<T>;
  onSubmit: (values: Values) => Promise<void>;
  onChange?: (payload: {
    name: string;
    value: string | string[] | number;
  }) => void;
  options?: CollectionFormSelectOptionsMap<T>;
  initValues?: Values;
}

export const CollectionForm: React.FC<CollectionFormProps> = ({
  route,
  inputTypes,
  inputValidation,
  onSubmit,
  onChange,
  options = {},
  initValues: passedInitValues = undefined,
}) => {
  const navigate = useNavigate();
  const initValues = useMemo(
    () =>
      passedInitValues
        ? getFormInitValues({ values: passedInitValues, inputTypes })
        : getFormEmptyValues({ inputTypes, options }),
    [inputTypes, options, passedInitValues]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Values | undefined>(
    initValues as Values | undefined
  );

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    if (onChange) onChange({ name, value });
    setValues((prev: Values | undefined) =>
      !prev ? prev : { ...prev, [name]: value }
    );
  };

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      try {
        e?.preventDefault();

        if (!values) return;

        const validatedValues = await z
          .object(inputValidation)
          .parseAsync(getParsedSubmitValues({ values, inputTypes }));

        onSubmit(validatedValues as ICollectionPayload);

        navigate(`/${route}`);
      } catch (error) {
        const parsedError = JSON.parse(JSON.stringify(error));

        if (parsedError?.name === 'ZodError') {
          const zodErrors = (parsedError as ZodError).issues.reduce(
            (acc, { path, message }) => ({ ...acc, [path.join('')]: message }),
            {}
          );

          return setErrors(zodErrors);
        }

        console.log('error:', error);
      }
    },
    [inputTypes, inputValidation, navigate, onSubmit, route, values]
  );

  if (!initValues) return <div>Loading...</div>;

  return (
    <Stack>
      <Stack as="form" gap={8} onSubmit={handleSubmit}>
        <Stack>
          {Object.entries(inputTypes).map(([name, type]) => {
            const error = errors[name as keyof typeof errors];

            return (
              <Field.Root key={name} invalid={!!error}>
                {(() => {
                  const label = Case.title(name);
                  const value = (values as object)[name as keyof typeof values];

                  if (
                    ['select', 'multiSelect'].includes(type as InputTypesValues)
                  ) {
                    return (
                      <SelectField
                        name={name}
                        label={label}
                        type={type as SelectFieldType}
                        value={value}
                        onChange={handleChange}
                        options={
                          options ? options[name as keyof typeof options] : []
                        }
                      />
                    );
                  }

                  //   if (type === 'switch') {
                  //     return <SwitchField label="Thing" />;
                  //   }

                  if (type === 'enum') {
                    return (
                      <EnumField
                        name={name}
                        label={label}
                        value={value}
                        onChange={handleChange}
                        options={
                          options ? options[name as keyof typeof options] : []
                        }
                      />
                    );
                  }

                  return (
                    <InputField
                      name={name}
                      label={label}
                      type={type as InputTypesValues}
                      value={value}
                      onChange={handleChange}
                    />
                  );
                })()}
                {error && <Field.ErrorText>{error}</Field.ErrorText>}
              </Field.Root>
            );
          })}
        </Stack>
        <HStack justifyContent="flex-end" gap={4}>
          <Button {...{ as: Link, to: `/${route}` }} variant="outline">
            <MdClose />
            Cancel
          </Button>
          <Button type="submit">
            <MdSave />
            Save
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};
