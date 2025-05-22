import { Skeleton } from '@chakra-ui/react';
import { CategoryTagTemplate } from './Template';

export const CategoryTagLoading: React.FC = () => (
  <CategoryTagTemplate icon={<Skeleton />} label={<Skeleton h={4} w={12} />} />
);
