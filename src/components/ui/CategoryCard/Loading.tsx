import { Skeleton } from '@chakra-ui/react';
import { CategoryCardTemplate } from './Template';
import { CategoryTag } from './fragments';

export const CategoryCardLoading: React.FC = () => (
  <CategoryCardTemplate
    avatarBg="transparent"
    icon={<Skeleton rounded="full" h="full" w="full" />}
    label={<Skeleton h={5} w={24} />}
    tags={
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <CategoryTag.Loading key={`categoryTag__loading-${i}`} />
        ))}
      </>
    }
  />
);
