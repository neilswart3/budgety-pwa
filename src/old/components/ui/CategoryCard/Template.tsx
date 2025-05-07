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
import { useMemo } from 'react';

type TemplateProps = Omit<CardRootProps, 'title'> & {
  color?: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  content?: React.ReactNode;
};

export default function Template({
  color,
  icon,
  title,
  subtitle,
  content,
  ...props
}: TemplateProps) {
  const circleColor = useMemo(() => {
    if (!color) return 'fg';
    if (color === 'transparent') return color;

    return { base: `${color}.600`, _dark: `${color}.400` };
  }, [color]);

  return (
    <Card.Root size="sm" {...props}>
      <Card.Body w="full" p={3}>
        <Grid gap={3} gridTemplateColumns="auto 1fr" alignItems="center">
          <GridItem as={Stack} justifyContent="center">
            <Avatar.Root
              borderWidth={3}
              borderColor={circleColor}
              variant="outline"
              size="xl"
            >
              <Icon color={circleColor} size="xl">
                {icon}
              </Icon>
            </Avatar.Root>
          </GridItem>
          <GridItem as={Stack} flex={1} gap={1} overflow="hidden">
            <Card.Title
              fontWeight="bold"
              textWrap="nowrap"
              textOverflow="ellipsis"
              overflow="hidden"
              fontSize={18}
            >
              {title}
            </Card.Title>
            {subtitle && <HStack>{subtitle}</HStack>}
          </GridItem>
          {content && <GridItem gridColumn="span 2">{content}</GridItem>}
        </Grid>
      </Card.Body>
    </Card.Root>
  );
}
