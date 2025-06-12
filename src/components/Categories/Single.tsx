import {
  useCategoriesDelete,
  useCategoriesItem,
  useSubCategoriesSearch,
} from '@/hooks';
import { SingleLayout } from '@/layouts';
import { useParams } from 'react-router';
import { CategoryCard } from '../ui';
import { ICategory } from '@/core';
import { Avatar, Box, Card, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import Case from 'case';
// import * as mdIcons from 'react-icons/md';

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
            subCategories.data.map(({ id, name, icon, description }) => {
              //   const TheIcon = mdIcons[icon.trim() as keyof typeof mdIcons];
              const TheIcon = () => <Box scale={0.5}>{icon}</Box>;

              return (
                <Card.Root key={id}>
                  <Card.Header>
                    <HStack>
                      <Avatar.Root>
                        <Icon size="xl">
                          <TheIcon />
                        </Icon>
                      </Avatar.Root>
                      <Card.Title>{Case.title(name)}</Card.Title>
                    </HStack>
                  </Card.Header>
                  <Card.Body>
                    <Card.Description>{description}</Card.Description>
                  </Card.Body>
                </Card.Root>
              );
            })}
        </Stack>

        <pre>{JSON.stringify(category.data, null, 2)}</pre>
      </Stack>
    </SingleLayout>
  );
};
