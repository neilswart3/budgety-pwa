import { CollectionKey } from '@/constants';
import { routeMeta } from '@/routes';
import { populateDatabase } from '@/utils/populateDatabase';
import { Button, Stack } from '@chakra-ui/react';

export const Settings: React.FC = () => {
  const populateCollections = {
    accounts: {
      meta: routeMeta.accounts,
      onClick: async () => await populateDatabase(CollectionKey.ACCOUNTS),
    },
    categories: {
      meta: routeMeta.categories,
      onClick: async () => {
        await populateDatabase(CollectionKey.SUB_CATEGORIES);
        await populateDatabase(CollectionKey.CATEGORIES);
      },
    },
    occasions: {
      meta: routeMeta.occasions,
      onClick: async () => await populateDatabase(CollectionKey.OCCASIONS),
    },
    savings: {
      meta: routeMeta.savings,
      onClick: async () => await populateDatabase(CollectionKey.SAVINGS),
    },
  };

  return (
    <Stack>
      <Stack gap={4}>
        <h3>Populate database</h3>
        <Stack gap={4}>
          {Object.values(populateCollections).map(
            ({ meta: { icon: Icon, ...meta }, onClick }) => (
              <Button key={meta.slug} onClick={onClick}>
                <Icon />
                Populate {meta.label}
              </Button>
            )
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
