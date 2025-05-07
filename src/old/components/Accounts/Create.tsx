import { Stack } from '@chakra-ui/react';
import { IAccountItem, IBaseModelPayload, useAccounts } from '@/core';
import { Form, FormInput } from '@/components/ui';
import Case from 'case';
import { useForm } from '@/hooks';
import { IoSaveSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

export type IAccountFormValues = Pick<
  IAccountItem,
  'name' | 'monthBudgetAmount' | 'description'
>;

export const CreateAccount: React.FC = () => {
  const fields: Record<'basicInfo', (keyof IAccountFormValues)[]> = {
    basicInfo: ['name', 'monthBudgetAmount', 'description'],
  };

  const navigate = useNavigate();

  const { createItem } = useAccounts.mutation({
    onSuccess: () => navigate('/accounts'),
  });

  const handleSubmitForm = useCallback(
    async (values: IAccountFormValues) => {
      try {
        await createItem.mutateAsync(
          values as unknown as IBaseModelPayload<IAccountItem>
        );
      } catch (error) {
        console.log('error:', error);
      }
    },
    [createItem]
  );

  const { values, handleChange, handleSubmit } = useForm<IAccountFormValues>({
    initValues: { name: '', description: '', monthBudgetAmount: 0 },
    onSubmit: handleSubmitForm,
  });

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
          <Stack>
            {keys.map((key) => {
              return (
                <FormInput
                  key={key}
                  name={key}
                  value={values[key]}
                  onChange={handleChange}
                />
              );
            })}
          </Stack>
        </Form.Block>
      ))}
    </Form.Container>
  );
};
