import {
  Avatar,
  Card,
  defineStyle,
  HStack,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router';

interface Props {
  icon: ReactElement;
  label: ReactElement | string;
  tags: ReactElement;
  colorPalette?: string;
  ring?: boolean;
  avatarBg?: string;
  link?: string;
}

export const CategoryCardTemplate: React.FC<Props> = ({
  icon,
  label,
  tags,
  ring,
  colorPalette = 'grey',
  avatarBg,
  link,
}) => (
  <Card.Root>
    <Card.Header>
      <HStack gap={6} alignItems="center">
        <Avatar.Root
          size="xl"
          {...(avatarBg ? { bg: avatarBg } : {})}
          {...(ring
            ? {
                colorPalette,
                css: defineStyle({
                  outlineWidth: 3,
                  outlineColor: `${colorPalette}.500`,
                  outlineOffset: 2,
                  outlineStyle: 'solid',
                }),
              }
            : {})}
        >
          <Icon size="2xl">{icon}</Icon>
        </Avatar.Root>
        <Stack flex={1}>
          <Card.Title>{label}</Card.Title>
        </Stack>
        {!!link && (
          <HStack>
            <IconButton
              {...{ as: Link, to: link }}
              rounded="full"
              variant="ghost"
            >
              <MdChevronRight />
            </IconButton>
          </HStack>
        )}
      </HStack>
    </Card.Header>
    <Card.Body>
      <HStack flexWrap="wrap">{tags}</HStack>
    </Card.Body>
  </Card.Root>
);
