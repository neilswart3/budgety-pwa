import {
  Avatar,
  Card,
  CardRootProps,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react';

type TemplateProps = Omit<CardRootProps, 'title'> & {
  category: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  amount: React.ReactNode;
  date: React.ReactNode;
};

export default function Template({
  category,
  title,
  subtitle,
  amount,
  date,
  ...props
}: TemplateProps) {
  return (
    <Card.Root size="sm" {...props}>
      <Card.Body w="full" p={3}>
        <Grid gap={3} gridTemplateColumns="auto 1fr auto">
          <GridItem as={Stack} justifyContent="center">
            <Avatar.Root variant="outline" size="lg">
              <Icon size="xl">{category}</Icon>
            </Avatar.Root>
          </GridItem>
          <GridItem as={Stack} flex={1} gap={1} overflow="hidden">
            <Card.Title
              fontWeight="bold"
              textWrap="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              fontSize={{ base: 14, sm: 16 }}
            >
              {title}
            </Card.Title>
            <HStack>{subtitle}</HStack>
          </GridItem>
          <GridItem as={Stack} alignItems="flex-end">
            <HStack fontWeight="bold">{amount}</HStack>
            {date}
          </GridItem>
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}
