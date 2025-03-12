import { ITransaction } from '@/core';
import { getFormattedDate } from '@/utils';
import {
  Avatar,
  Badge,
  Card,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import Case from 'case';
import { MdEuroSymbol, MdFoodBank, MdReceiptLong } from 'react-icons/md';
import { Link } from 'react-router';

type Props = Pick<
  ITransaction,
  | 'id'
  | 'name'
  | 'type'
  | 'amount'
  | 'date'
  | 'category'
  | 'location'
  | 'source'
>;

export const TransactionCard: React.FC<Props> = ({
  id,
  name,
  type,
  amount,
  date,
  category,
  source,
  location,
}) => {
  return (
    <Card.Root
      borderLeftColor={type === 'expense' ? 'red.400' : 'green.400'}
      borderLeftWidth={4}
      variant="elevated"
      {...{ as: Link, to: id }}
    >
      <Card.Body w="full">
        <HStack gap={4}>
          <Avatar.Root variant="outline" size="2xl">
            <Icon size="2xl">
              {category === 'food' ? <MdFoodBank /> : <MdReceiptLong />}
            </Icon>
          </Avatar.Root>
          <Stack flex={1} gap={1}>
            <Card.Title fontWeight="bold">{Case.title(name)}</Card.Title>
            <HStack>
              <Badge variant="solid">{Case.title(source)}</Badge>
              <Text fontSize={14}>{location}</Text>
            </HStack>
          </Stack>
          <Stack alignItems="flex-end">
            <HStack fontWeight="bold">
              <Icon>
                <MdEuroSymbol />
              </Icon>
              {type === 'expense' ? '-' : '+'}
              {parseInt(amount as unknown as string).toFixed(2)}
            </HStack>
            <Text fontSize={14}>{getFormattedDate(date, 'd MMM')}</Text>
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};
