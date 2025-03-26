import { CategoryForm, ICategoryFormValues } from '@/components/ui';
import { IBaseModelPayload, ICategoryItem, useCategories } from '@/core';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

export const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const { createItem } = useCategories.mutation({
    onSuccess: () => navigate('/categories'),
  });

  const handleSubmit = useCallback(
    async (values: ICategoryFormValues) => {
      try {
        await createItem.mutateAsync(
          values as unknown as IBaseModelPayload<ICategoryItem>
        );
      } catch (error) {
        console.log('error:', error);
      }
    },
    [createItem]
  );

  return (
    <CategoryForm
      initValues={{ name: '', description: '', icon: 'IoAccessibility' }}
      onSubmit={handleSubmit}
    />
  );
};
