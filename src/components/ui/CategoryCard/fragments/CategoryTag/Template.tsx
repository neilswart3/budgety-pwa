import { Avatar, Icon, Tag } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  label: ReactElement | string;
}

export const CategoryTagTemplate: React.FC<Props> = ({ icon, label }) => (
  <Tag.Root size="xl" rounded="full">
    <Tag.StartElement>
      <Avatar.Root size="full">
        <Icon>{icon}</Icon>
      </Avatar.Root>
    </Tag.StartElement>
    <Tag.Label>{label}</Tag.Label>
  </Tag.Root>
);
