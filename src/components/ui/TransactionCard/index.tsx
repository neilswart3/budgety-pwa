import { ITransactionItem } from '@/core';
import { getFormattedDate } from '@/utils';
import { Badge, Icon, Text } from '@chakra-ui/react';
import Case from 'case';
import { MdEuroSymbol, MdFoodBank, MdReceiptLong } from 'react-icons/md';
import { Link } from 'react-router';
import Template from './Template';
import Loading from './Loading';

interface Props
  extends Pick<
    ITransactionItem,
    'id' | 'name' | 'type' | 'amount' | 'date' | 'category' | 'source'
  > {
  link?: boolean;
}

const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  name,
  type,
  amount,
  date,
  category,
  source,
  link = false,
}) => (
  <Template
    {...(link ? { as: Link, to: id } : {})}
    borderLeftColor={type === 'expense' ? 'red.400' : 'green.400'}
    borderLeftWidth={4}
    variant="elevated"
    category={category === 'food' ? <MdFoodBank /> : <MdReceiptLong />}
    title={Case.title(name)}
    subtitle={
      <>
        <Badge variant="solid">{Case.title(source)}</Badge>
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
    date={<Text fontSize={14}>{getFormattedDate(date, 'd MMM')}</Text>}
  />
);

Component.Loading = Loading;

export const TransactionCard = Component;
