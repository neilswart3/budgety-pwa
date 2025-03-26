import {
  IBaseCollectionItem,
  IBaseTransactionItem,
  ICategoryItem,
  TransactionItemTypeField,
  useCategories,
} from '@/core';
import { Grid, GridItem, HStack, IconButton } from '@chakra-ui/react';
import Case from 'case';
import { FormInput } from '../FormInput';
import { Field } from '../field';
import { IoReload, IoSaveSharp } from 'react-icons/io5';
import { Datepicker } from '../Datepicker';
import { Form } from '../Form';
import { useForm, UseFormHandleChangePayload } from '@/hooks';
import { ChangeEvent, useCallback, useMemo } from 'react';

export type ITransactionFormValues = IBaseTransactionItem &
  Pick<IBaseCollectionItem, 'name'>;

interface Props {
  initValues: ITransactionFormValues;
  onSubmit: (values: ITransactionFormValues) => Promise<void>;
}

export const TransactionForm: React.FC<Props> = ({ initValues, onSubmit }) => {
  const fields: Record<
    'basicInfo' | 'transactionDate',
    (keyof ITransactionFormValues)[]
  > = {
    basicInfo: [
      'type',
      'name',
      'user',
      'category',
      'source',
      'amount',
      'location',
      'description',
    ],
    transactionDate: ['date', 'salaryMonth'],
  };

  const categories = useCategories.search();

  const categoryOptions = useMemo(
    () =>
      (categories.data as ICategoryItem[])?.map(({ id, name }) => ({
        id,
        value: id,
        label: name,
      })) || [],
    [categories.data]
  );

  const {
    values,
    handleChange: onChange,
    handleResetValue,
    handleSubmit,
  } = useForm<ITransactionFormValues>({ initValues, onSubmit });

  const handleChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({
        target: { name: target.name, value: target.value },
      } as UseFormHandleChangePayload<ITransactionFormValues>),
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
          <Grid
            gap={2}
            gridTemplateColumns={{ md: 'repeat(2, minmax(0, 1fr))' }}
          >
            {keys.map((key) => (
              <GridItem
                key={key}
                gridColumn={{
                  md: ['type', 'description'].includes(key) ? '1 / 3' : 'auto',
                }}
              >
                {(() => {
                  if (['date', 'salaryMonth'].includes(key)) {
                    return (
                      <Field
                        key={key}
                        label={
                          <HStack justify="space-between">
                            {Case.title(key)}
                            <IconButton
                              variant="subtle"
                              bg="bg.subtle"
                              onClick={() =>
                                handleResetValue(
                                  name as keyof ITransactionFormValues
                                )
                              }
                            >
                              <IoReload />
                            </IconButton>
                          </HStack>
                        }
                      >
                        <Datepicker
                          name={key}
                          value={
                            values[
                              key as keyof ITransactionFormValues
                            ] as string
                          }
                          monthYearPicker={key === 'salaryMonth'}
                          onChange={handleChange}
                        />
                      </Field>
                    );
                  }

                  return (
                    <FormInput
                      name={key}
                      value={
                        values[key as keyof ITransactionFormValues] as string
                      }
                      required={key !== 'description'}
                      onChange={handleChange}
                      options={
                        key === 'type'
                          ? [
                              {
                                value: 'Expense',
                                id: TransactionItemTypeField.EXPENSE,
                                label: 'Expense',
                              },
                              {
                                value: 'Income',
                                id: TransactionItemTypeField.INCOME,
                                label: 'Income',
                              },
                            ]
                          : key === 'category'
                          ? categoryOptions
                          : key === 'source'
                          ? [
                              {
                                id: 'maaltijdchecques',
                                value: 'maaltijdchecques',
                                label: 'Maaltijdchecques',
                              },
                              {
                                id: 'holiday savings',
                                value: 'holiday savings',
                                label: 'Holiday Savings',
                              },
                              {
                                id: 'spending money',
                                value: 'spending money',
                                label: 'Spending Money',
                              },
                            ]
                          : key === 'user'
                          ? [
                              {
                                id: 'me',
                                value: 'me',
                                label: 'Me',
                              },
                              {
                                id: 'marisa',
                                value: 'marisa',
                                label: 'Marisa',
                              },
                              {
                                id: 'neil',
                                value: 'neil',
                                label: 'Neil',
                              },
                            ]
                          : undefined
                      }
                    />
                  );
                })()}
              </GridItem>
            ))}
          </Grid>
        </Form.Block>
      ))}
    </Form.Container>
  );
};
