import { ITransactionItem } from '@/core';
import { getFormattedDate } from '@/utils';
import {
  Avatar,
  Badge,
  Card,
  CardRootProps,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react';
import Case from 'case';
import { MdEuroSymbol, MdFoodBank, MdReceiptLong } from 'react-icons/md';
import { Link } from 'react-router';

type TemplateProps = Omit<CardRootProps, 'title'> & {
  category: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  amount: React.ReactNode;
  date: React.ReactNode;
};

const Template: React.FC<TemplateProps> = ({
  category,
  title,
  subtitle,
  amount,
  date,
  ...props
}) => (
  <Card.Root size="sm" {...props}>
    <Card.Body w="full">
      <HStack gap={4}>
        <Avatar.Root variant="outline" size="2xl">
          <Icon size="2xl">{category}</Icon>
        </Avatar.Root>
        <Stack flex={1} gap={1}>
          <Card.Title fontWeight="bold">{title}</Card.Title>
          <HStack>{subtitle}</HStack>
        </Stack>
        <Stack alignItems="flex-end">
          <HStack fontWeight="bold">{amount}</HStack>
          <Text fontSize={14}>{date}</Text>
        </Stack>
      </HStack>
    </Card.Body>
  </Card.Root>
);

type Props = Pick<
  ITransactionItem,
  | 'id'
  | 'name'
  | 'type'
  | 'amount'
  | 'date'
  | 'category'
  | 'location'
  | 'source'
>;

const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  name,
  type,
  amount,
  date,
  category,
  source,
  location,
}) => (
  <Template
    {...{ as: Link, to: id }}
    borderLeftColor={type === 'expense' ? 'red.400' : 'green.400'}
    borderLeftWidth={4}
    variant="elevated"
    category={category === 'food' ? <MdFoodBank /> : <MdReceiptLong />}
    title={Case.title(name)}
    subtitle={
      <>
        <Badge variant="solid">{Case.title(source)}</Badge>
        <Text fontSize={14}>{location}</Text>
      </>
    }
    amount={
      <>
        <Icon>
          <MdEuroSymbol />
        </Icon>
        {type === 'expense' ? '-' : '+'}
        {parseInt(amount as unknown as string).toFixed(2)}
      </>
    }
    date={getFormattedDate(date, 'd MMM')}
  />
);

const TransactionCardLoading: React.FC = () => (
  <Template
    variant="outline"
    bg="bg"
    category={<Skeleton borderRadius="full" h="full" w="full" />}
    title={<Skeleton w={32} h={6} />}
    subtitle={
      <>
        <Skeleton w={24} h={5} />
        <Skeleton w={24} h={5} />
      </>
    }
    amount={<Skeleton w={20} h={6} />}
    date={<Skeleton w={14} h={5} />}
  />
);

Component.Loading = TransactionCardLoading;

export const TransactionCard = Component;
