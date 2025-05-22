import { ICategory } from '@/core';
import { useSubCategoriesSearch } from '@/hooks';
import { HStack } from '@chakra-ui/react';
import Case from 'case';
import { useMemo } from 'react';
import * as mdIcons from 'react-icons/md';
import tinyColor from 'tinycolor2';
import { CategoryTag } from './fragments';
import { CategoryCardTemplate } from './Template';
import { CategoryCardLoading } from './Loading';

type Props = ICategory;

export const Component: React.FC<Props> & { Loading: React.FC } = ({
  id,
  icon,
  color,
  name,
  subCategories,
}) => {
  const colorPalette = useMemo(
    () => tinyColor(color).toName() || 'grey',
    [color]
  );
  const TheIcon = useMemo(
    () => mdIcons[icon.trim() as keyof typeof mdIcons] || mdIcons.MdCategory,
    [icon]
  );

  const { data, isFetching } = useSubCategoriesSearch({ id: subCategories });

  return (
    <CategoryCardTemplate
      ring
      colorPalette={colorPalette}
      icon={<TheIcon />}
      label={Case.title(name)}
      link={id}
      tags={
        <HStack flexWrap="wrap">
          {isFetching &&
            !data?.length &&
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
