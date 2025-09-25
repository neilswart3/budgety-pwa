import { ICategory } from '@/core';
import {
  Avatar,
  Card,
  defineStyle,
  HStack,
  Icon,
  Stack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router';

interface Props extends Pick<ICategory, 'description'> {
  icon: ReactElement;
  label: ReactElement | string;
  tags: ReactElement;
  colorPalette?: string;
  ring?: boolean;
  avatarBg?: string;
  link?: string | false;
}

export const CategoryCardTemplate: React.FC<Props> = ({
  icon,
  label,
  tags,
  ring,
  colorPalette = 'grey',
  avatarBg,
  link,
  description,
}) => {
  return (
    <Card.Root>
      <Card.Header
        {...(link ? { as: Link, to: link } : {})}
        p={6}
        bg="bg.muted"
      >
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
              <MdChevronRight size={28} />
            </HStack>
          )}
        </HStack>
      </Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <Stack>{description}</Stack>
          <HStack flexWrap="wrap">{tags}</HStack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
