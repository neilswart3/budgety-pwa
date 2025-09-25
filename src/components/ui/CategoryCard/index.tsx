import { ICategory } from '@/core';
import { useSubCategoriesSearch } from '@/hooks';
import { HStack } from '@chakra-ui/react';
import Case from 'case';
import { useMemo } from 'react';

import tinyColor from 'tinycolor2';
import { CategoryTag } from './fragments';
import { CategoryCardTemplate } from './Template';
import { CategoryCardLoading } from './Loading';
import { MdIcon } from '../MdIcon';

interface Props extends ICategory {
  link?: boolean;
}

export const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  icon,
  color,
  name,
  subCategories,
  link,
  description,
}) => {
  const colorPalette = useMemo(
    () => tinyColor(color).toName() || 'grey',
    [color]
  );

  const { data, isPending } = useSubCategoriesSearch({ id: subCategories });

  return (
    <CategoryCardTemplate
      ring
      colorPalette={colorPalette}
      icon={<MdIcon icon={icon} />}
      label={Case.title(name)}
      link={link && id}
      description={description}
      tags={
        <HStack flexWrap="wrap">
          {isPending &&
            Array.from({ length: 3 }).map((_, i) => (
              <CategoryTag.Loading key={`categoryTag__loading--${id}-${i}`} />
            ))}
          {data?.map(({ id, name, icon }) => (
            <CategoryTag key={id} id={id} name={name} icon={icon} />
          ))}
        </HStack>
      }
    />
  );
};

Component.Loading = CategoryCardLoading;
export const CategoryCard = Component;
