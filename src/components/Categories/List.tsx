import { useCategoriesList } from '@/hooks';
import { ListLayout } from '@/layouts';
import { Stack } from '@chakra-ui/react';
import { CategoryCard } from '../ui';

export const ListCategories: React.FC = () => {
  const { data, isFetching } = useCategoriesList();

  return (
    <ListLayout loading={!data && isFetching}>
      <Stack gap={4}>
        {isFetching &&
          !data?.length &&
          Array.from({ length: 4 }).map((_, i) => (
            <CategoryCard.Loading key={`categoryCard__loading--${i}`} />
          ))}
        {!!data?.length &&
          data?.map((item) => <CategoryCard key={item.id} {...item} link />)}
      </Stack>
    </ListLayout>
  );
};
