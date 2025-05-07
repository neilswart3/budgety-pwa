import { ICategoryItem, themeIcons } from '@/old/core';
import Case from 'case';
import { Link } from 'react-router';
import Template from './Template';
import Loading from './Loading';
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
  icon = 'MdFormatShapes',
  color,
  link = false,
}) => {
  const CategoryIcon = useMemo(
    () => themeIcons[icon as keyof typeof themeIcons] || themeIcons?.MdCategory,
    [icon]
  );

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
