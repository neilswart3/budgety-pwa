import {
  Fieldset,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field, Datepicker, FormInput } from '@/components/ui';
import { IoReload } from 'react-icons/io5';
import Case from 'case';

const initValues = {
  name: '',
  description: '',
  date: new Date(),
  salaryMonth: new Date(),
  amount: 0,
  category: 'food',
  source: 'maaltijd cheques',
  type: 'expense',
};

type Values = typeof initValues;
type ValuesKey = keyof Values;

export const CreateTransaction: React.FC = () => {
  const [values, setValues] = useState<Values>({ ...initValues });

  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string | null | undefined | Date };
  }) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetDate = (name: 'date' | 'salaryMonth') => {
    setValues((prev) => ({ ...prev, [name]: new Date() }));
  };

  return (
    <Fieldset.Root>
      <Grid
        as="form"
        gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))"
        gap={8}
      >
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Basic info</Fieldset.Legend>
          <Fieldset.Content>
            {[
              'name',
              'description',
              'type',
              'category',
              'source',
              'amount',
            ].map((name) => (
              <FormInput
                key={name}
                name={name}
                value={values[name as ValuesKey] as string}
                required={name !== 'description'}
                options={
                  name === 'type'
                    ? [
                        { value: 'Expense', id: 'expense', label: 'Expense' },
                        { value: 'Income', id: 'income', label: 'Income' },
                      ]
                    : name === 'category'
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
                    : name === 'source'
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
                          label: 'Sspending Money',
                        },
                      ]
                    : undefined
                }
                onChange={handleChange}
              />
            ))}
          </Fieldset.Content>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </GridItem>
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Transaction Date</Fieldset.Legend>
          <Fieldset.Content alignItems="start">
            {['date', 'salaryMonth'].map((name) => (
              <Field
                key={name}
                label={
                  <HStack justify="space-between" w="full">
                    {Case.title(name)}
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
                  name={name}
                  value={values[name as ValuesKey] as Date}
                  monthYearPicker={name === 'salaryMonth'}
                  onChange={handleChange}
                />
              </Field>
            ))}
          </Fieldset.Content>
        </GridItem>
      </Grid>
    </Fieldset.Root>
  );
};
