import { Button, HStack, Stack } from '@chakra-ui/react';
import { IoAddSharp } from 'react-icons/io5';
import { CategoryCard } from '../ui';
import { Link } from 'react-router';
import { ICategoryItem, useCategories } from '@/old/core';

export const CategoriesList: React.FC = () => {
  const { data, isLoading } = useCategories.search();

  return (
    <Stack gap={6}>
      <HStack>
        <Button {...{ as: Link, to: 'create' }}>
          <IoAddSharp />
          Add New
        </Button>
      </HStack>
      <Stack gap={4}>
        {!data &&
          isLoading &&
          Array.from({ length: 9 }).map((_, i) => (
            <CategoryCard.Loading key={`categories-list-placeholder-${i}`} />
          ))}

        {!!(data as ICategoryItem[])?.length &&
          (data as ICategoryItem[])?.map((props) => (
            <CategoryCard link key={props.id} {...props} />
          ))}
      </Stack>
    </Stack>
  );
};
