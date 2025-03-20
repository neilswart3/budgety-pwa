import { Button, HStack, Icon, Stack } from '@chakra-ui/react';
import { AccountCard } from '@/components/ui';
import { IoAddSharp } from 'react-icons/io5';

export const AccountsList: React.FC = () => {
  return (
    <Stack gap={3}>
      <HStack>
        <Button>
          <Icon>
            <IoAddSharp />
          </Icon>
          Add New
        </Button>
      </HStack>
      {[...Array(6)].map((_, i) => (
        <AccountCard key={`account-card-${i}`} value={i} label="Account Item" />
      ))}
    </Stack>
  );
};
