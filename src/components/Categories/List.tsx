import { Button, HStack, Icon, Stack } from '@chakra-ui/react';
import { IoAddSharp } from 'react-icons/io5';
import { CategoryCard } from '../ui';

export const CategoriesList: React.FC = () => {
  return (
    <Stack>
      <HStack>
        <Button>
          <Icon>
            <IoAddSharp />
          </Icon>
          Add New
        </Button>
      </HStack>
      <Stack gap={4}>
        <CategoryCard id="randowm-id" name="food" description="Something" />
        <CategoryCard id="randowm-id-1" name="food" description="Something" />
        <CategoryCard.Loading />
      </Stack>
    </Stack>
  );
};
