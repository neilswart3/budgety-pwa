import {
  useCategoriesDelete,
  useCategoriesItem,
  useSubCategoriesSearch,
} from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';
import { CategoryCard, SubCategoryCard } from '../ui';
import { ICategory } from '@/core';
import { Stack, Text } from '@chakra-ui/react';

export const SingleCategory: React.FC = () => {
  const { category: id } = useParams();

  const category = useCategoriesItem(id as string);
  const { mutateAsync } = useCategoriesDelete('id');

  const subCategories = useSubCategoriesSearch({
    id: category.data?.subCategories || [],
  });

  return (
    <SingleLayout
      id={category.data?.id}
      route="categories"
      loading={!category.data && category.isFetching}
      onMutate={mutateAsync}
    >
      <Stack gap={4}>
        <CategoryCard {...(category.data as ICategory)} />
        <Text>{category.data?.description}</Text>

        <Stack px={6}>
          {subCategories?.data?.length &&
            subCategories.data.map((d) => (
              <SubCategoryCard key={d.id} {...d} />
            ))}
        </Stack>

        <pre>{JSON.stringify(category.data, null, 2)}</pre>
      </Stack>
    </SingleLayout>
  );
};
