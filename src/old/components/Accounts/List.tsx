import { Button, HStack, Icon, Stack } from '@chakra-ui/react';
import { AccountCard } from '@/components/ui';
import { IoAddSharp } from 'react-icons/io5';
import { AccountItemModel } from '@/core';
import { Link } from 'react-router';

export const AccountsList: React.FC = () => {
  const fieldTypes = AccountItemModel.fieldTypes;

  return (
    <Stack gap={3}>
      <div>
        <pre>{JSON.stringify(fieldTypes, null, 2)}</pre>
      </div>

      <HStack>
        <Button {...{ as: Link, to: 'create' }}>
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
