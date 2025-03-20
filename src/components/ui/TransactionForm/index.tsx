import {
  IBaseCollectionItem,
  IBaseTransactionItem,
  TransactionItemTypeField,
} from '@/core';
import {
  Button,
  Fieldset,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import Case from 'case';
import { SyntheticEvent, useCallback, useState } from 'react';
import { FormInput } from '../FormInput';
import { Field } from '../field';
import { IoReload, IoSaveSharp } from 'react-icons/io5';
import { Datepicker } from '../Datepicker';
import { Form } from '../Form';

export type ITransactionFormValues = IBaseTransactionItem &
  Pick<IBaseCollectionItem, 'name'>;

interface Props {
  initValues: ITransactionFormValues;
  onSubmit: (values: ITransactionFormValues) => Promise<void>;
}

export const TransactionForm: React.FC<Props> = ({ initValues, onSubmit }) => {
  const [values, setValues] = useState<ITransactionFormValues>({
    ...initValues,
  });

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

  const handleChange = useCallback(
    ({
      target: { name, value },
    }: {
      target: { name: string; value: string | null | undefined | Date };
    }) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleResetDate = useCallback(
    (key: keyof Pick<IBaseTransactionItem, 'date' | 'salaryMonth'>) => {
      setValues((prev) => ({ ...prev, [key]: initValues[key] }));
    },
    [initValues]
  );

  const handleSubmit = useCallback(
    async (e: SyntheticEvent) => {
      try {
        e?.preventDefault();
        await onSubmit(values);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [onSubmit, values]
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
                                handleResetDate(name as 'date' | 'salaryMonth')
                              }
                            >
                              <Icon>
                                <IoReload />
                              </Icon>
                            </IconButton>
                          </HStack>
                        }
                      >
                        <Datepicker
                          name={key}
                          value={
                            values[key as keyof IBaseTransactionItem] as Date
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
                        values[key as keyof IBaseTransactionItem] as string
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
                          ? [
                              {
                                id: 'household',
                                value: 'household',
                                label: 'Household',
                              },
                              {
                                id: 'food',
                                value: 'food',
                                label: 'Food',
                              },
                              {
                                id: 'holiday',
                                value: 'holiday',
                                label: 'Holiday',
                              },
                            ]
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
