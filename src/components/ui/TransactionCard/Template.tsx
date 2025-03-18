import {
  Avatar,
  Card,
  CardRootProps,
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
            {date}
          </Stack>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
}
