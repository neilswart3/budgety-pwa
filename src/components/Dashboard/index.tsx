import { useCategoriesList } from '@/hooks';
// import { CreateCollectionFormOptionsHooks } from '@/utils/CreateCollectionFormOptionsHooks';
import { Button, Stack } from '@chakra-ui/react';
// import { useQueryClient } from '@tanstack/react-query';
// import { CollectionKey } from '@/constants';

export const Dashboard: React.FC = () => {
  const { ...things } = useCategoriesList();

  return (
    // <Stack>
    //   <Stack>
    //     <h3>Dashboard</h3>
    //   </Stack>
    //   <Stack>
    //     <h3>Dashboard</h3>
    //   </Stack>
    // </Stack>
    <Stack>
      {/* <GridItem>General Transaction</GridItem> */}
      {things?.data?.map(({ name }) => {
        return (
          <Button key={name} colorScheme="teal" variant="outline">
            {name}
          </Button>
        );
      })}
    </Stack>
  );
};
