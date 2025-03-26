import { ICategoryItem } from '@/core';
import Case from 'case';
import { Link } from 'react-router';
import Template from './Template';
import Loading from './Loading';
import * as io5Icons from 'react-icons/io5';
import { Text } from '@chakra-ui/react';
import { useMemo } from 'react';

interface Props
  extends Pick<
    ICategoryItem,
    'id' | 'name' | 'description' | 'icon' | 'color'
  > {
  link?: boolean;
}

const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  name,
  description,
  icon = 'IoShapes',
  color,
  link = false,
}) => {
  const CategoryIcon = useMemo(() => io5Icons[icon], [icon]);

  return (
    <Template
      {...(link ? { as: Link, to: id } : {})}
      color={color || 'gray'}
      icon={<CategoryIcon />}
      title={Case.title(name)}
      content={<Text>{description}</Text>}
    />
  );
};

Component.Loading = Loading;

export const CategoryCard = Component;
