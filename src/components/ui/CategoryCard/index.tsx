import { ICategory } from '@/core';
import { useSubCategoriesSearch } from '@/hooks';
import { Box, HStack } from '@chakra-ui/react';
import Case from 'case';
import { useEffect, useMemo, useState } from 'react';

import tinyColor from 'tinycolor2';
import { CategoryTag } from './fragments';
import { CategoryCardTemplate } from './Template';
import { CategoryCardLoading } from './Loading';

import IconWorker from '@/workers/iconWorker?worker';

const MdIcon: React.FC<{ icon: string }> = ({ icon }) => {
  const [rawIcon, setRawIcon] = useState<string>();

  useEffect(() => {
    const iconWorker = new IconWorker();

    iconWorker.onmessage = ({ data }) => setRawIcon(data);
    iconWorker.postMessage(icon);

    return () => iconWorker.terminate();
  }, [icon]);

  return (
    <>{rawIcon && <Box dangerouslySetInnerHTML={{ __html: rawIcon }} />}</>
  );
};

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
}) => {
  const colorPalette = useMemo(
    () => tinyColor(color).toName() || 'grey',
    [color]
  );
  //   const TheIcon = useMemo(
  //     () => mdIcons[icon.trim() as keyof typeof mdIcons] || mdIcons.MdCategory,
  //     [icon]
  //   );

  //   console.log('mdIcons:', mdIcons);

  const { data, isPending } = useSubCategoriesSearch({ id: subCategories });

  return (
    <CategoryCardTemplate
      ring
      colorPalette={colorPalette}
      icon={<MdIcon icon={icon} />}
      //   icon={<Box scale={0.5}>{icon}</Box>}
      label={Case.title(name)}
      link={link && id}
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
