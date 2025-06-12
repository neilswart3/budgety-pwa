import { Skeleton } from '@chakra-ui/react';
import { CategoryCardTemplate } from '../CategoryCard/Template';

export const SubCategoryCardLoading: React.FC = () => {
  return (
    <CategoryCardTemplate
      avatarBg="transparent"
      icon={<Skeleton rounded="full" h="full" w="full" />}
      label={<Skeleton h={5} w={24} />}
      tags={
        <>
          <Skeleton h={5} w={24} />
        </>
      }
    />
  );
};
