import { IBaseModelPayload, ICategoryItem, useCategories } from '@/core';
import { UseQueryResult } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { CategoryForm, ICategoryFormValues } from '@/components/ui';

export const EditCategory: React.FC = () => {
  const navigate = useNavigate();
  const { category: id } = useParams();

  const { data, isFetching } = useCategories.query({
    categoryId: id,
  }) as UseQueryResult<ICategoryItem>;
  const { updateItem } = useCategories.mutation({
    onSuccess: () => navigate(`/categories/${id}`),
  });

  const handleSubmit = useCallback(
    async (values: ICategoryFormValues) => {
      try {
        if (!data?.id) throw new Error('EditCategory: id is not defined');

        await updateItem.mutateAsync({
          id: data?.id,
          ...values,
        } as unknown as IBaseModelPayload<ICategoryItem>);
      } catch (error) {
        console.log('error:', error);
      }
    },
    [data?.id, updateItem]
  );

  if (!data && isFetching) return <div>Loading</div>;
  if (!data) return <div>Not found</div>;

  return (
    <CategoryForm
      initValues={{ name: data.name, description: data.description }}
      onSubmit={handleSubmit}
    />
  );
};
