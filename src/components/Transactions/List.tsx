import { Text, Card, HStack, Stack, Badge, Heading } from '@chakra-ui/react';
import Case from 'case';
import { useMemo } from 'react';
import { IoLogoEuro } from 'react-icons/io5';

interface Transaction {
  id: string;
  name: string;
  description: string;
  date: Date;
  salaryMonth: Date;
  amount: number;
  category: string;
  location: string;
  source: string;
  type: string;
}

const getTransactionDate = (date: Date, picks: string): string => {
  const theDate = new Date(date);

  const t = {
    d: theDate.toLocaleDateString('en-ZA', { day: 'numeric' }),
    m: theDate.toLocaleDateString('en-ZA', { month: 'long' }),
    y: theDate.getFullYear().toString(),
    t: theDate.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: 'numeric',
    }),
  };

  return picks
    .split(' ')
    .map((p) => t[p as keyof typeof t] || p)
    .join(' ');
};

export const TransactionsList: React.FC = () => {
  const transactions = useMemo<Transaction[]>(
    () =>
      JSON.parse(
        window?.localStorage?.getItem('budgety-fake-transactions') || '[]'
      ),
    []
  );

  return (
    <Stack gap={4}>
      {transactions?.map(
        ({
          id,
          name,
          date,
          amount,
          category,
          source,
          type,
          location,
          salaryMonth,
          description,
        }) => (
          <Card.Root key={id} variant="subtle">
            <Card.Header>
              <Card.Title
                as={HStack}
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Heading as="h4">{Case.title(name)}</Heading>
                <Text as="h4">
                  <HStack as="span">
                    <IoLogoEuro />
                    {amount}
                  </HStack>
                </Text>
              </Card.Title>
              <HStack>
                Date:
                <Heading as="h6" size="md">
                  {getTransactionDate(date, 'd m y - t')}
                </Heading>
              </HStack>
              <HStack>
                Salary Month:
                <Heading as="h6" size="md">
                  {getTransactionDate(salaryMonth, 'm y')}
                </Heading>
              </HStack>
            </Card.Header>
            <Card.Body as={Stack} pt={2}>
              <HStack>location: {location}</HStack>

              <HStack flexWrap="wrap">
                {Object.entries({ type, category, source }).map(([k, v]) => (
                  <Badge key={k} variant="solid">
                    {Case.title(`${k}: ${v}`)}
                  </Badge>
                ))}
              </HStack>
              {description && <HStack>{description}</HStack>}
            </Card.Body>
          </Card.Root>
        )
      )}
    </Stack>
  );
};
