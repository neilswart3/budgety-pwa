import { ICategoryItem } from '@/core';
import Case from 'case';
import { Link } from 'react-router';
import Template from './Template';
import Loading from './Loading';
import { IoAccessibility } from 'react-icons/io5';
import { Text } from '@chakra-ui/react';

interface Props extends Pick<ICategoryItem, 'id' | 'name' | 'description'> {
  link?: boolean;
}

const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  name,
  description,
  link = false,
}) => (
  <Template
    {...(link ? { as: Link, to: id } : {})}
    color="green"
    icon={<IoAccessibility />}
    title={Case.title(name)}
    content={<Text>{description}</Text>}
  />
);

Component.Loading = Loading;

export const CategoryCard = Component;
