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
import { v4 as uuid } from 'uuid';
import { SyntheticEvent, useState } from 'react';
import { Field, Datepicker, FormInput } from '@/components/ui';
import { IoReload, IoSaveSharp } from 'react-icons/io5';
import Case from 'case';
import { useNavigate } from 'react-router';

const initValues = {
  name: '',
  description: '',
  date: new Date(),
  salaryMonth: new Date(),
  amount: 0,
  category: 'food',
  location: '',
  source: 'maaltijd cheques',
  user: 'me',
  type: 'expense',
};

type Values = typeof initValues;
type ValuesKey = keyof Values;

export const CreateTransaction: React.FC = () => {
  const [values, setValues] = useState<Values>({ ...initValues });
  const navigate = useNavigate();

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

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newTransaction = {
      ...values,
      id: uuid(),
      created: values.date,
      modified: values.date,
    };

    window.localStorage.setItem(
      'budgety-fake-transactions',
      JSON.stringify([
        newTransaction,
        ...JSON.parse(
          window.localStorage.getItem('budgety-fake-transactions') || '[]'
        ),
      ])
    );

    setValues({ ...initValues });
    navigate('/transactions');
  };

  return (
    <Stack as="form" gap={6} onSubmit={handleSubmit}>
      <Fieldset.Root>
        <Stack gap={4}>
          <Fieldset.Legend>Basic info</Fieldset.Legend>
          <Fieldset.Content>
            <Grid
              gap={2}
              gridTemplateColumns={{ md: 'repeat(2, minmax(0, 1fr))' }}
            >
              {[
                'type',
                'name',
                'user',
                'category',
                'source',
                'amount',
                'location',
                'description',
              ].map((name) => (
                <GridItem
                  key={name}
                  gridColumn={{
                    md: ['type', 'description'].includes(name)
                      ? '1 / 3'
                      : 'auto',
                  }}
                >
                  <FormInput
                    name={name}
                    value={values[name as ValuesKey] as string}
                    required={name !== 'description'}
                    options={
                      name === 'type'
                        ? [
                            {
                              value: 'Expense',
                              id: 'expense',
                              label: 'Expense',
                            },
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
                              label: 'Spending Money',
                            },
                          ]
                        : name === 'user'
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
                    onChange={handleChange}
                  />
                </GridItem>
              ))}
            </Grid>
          </Fieldset.Content>
        </Stack>
        <Stack gap={4}>
          <Fieldset.Legend>Transaction Date</Fieldset.Legend>
          <Fieldset.Content>
            <Grid
              gap={4}
              gridTemplateColumns={{ md: 'repeat(2, minmax(0, 1fr))' }}
            >
              {['date', 'salaryMonth'].map((name) => (
                <GridItem key={name}>
                  <Field
                    label={
                      <HStack justify="space-between">
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
                </GridItem>
              ))}
            </Grid>
          </Fieldset.Content>
        </Stack>
      </Fieldset.Root>

      <HStack>
        <Button type="submit">
          <IoSaveSharp />
          Submit
        </Button>
      </HStack>
    </Stack>
  );
};
