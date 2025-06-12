import { ISubCategory } from '@/core';
import { CategoryCardTemplate } from '../CategoryCard/Template';
import { MdIcon } from '../MdIcon';
import Case from 'case';
import { Card } from '@chakra-ui/react';
import { SubCategoryCardLoading } from './Loading';

type Props = ISubCategory;

const Component: React.FC<Props> & { Loading: React.FC } = ({
  icon,
  name,
  description,
}) => (
  <CategoryCardTemplate
    icon={<MdIcon icon={icon} />}
    label={Case.title(name)}
    tags={<Card.Description>{description}</Card.Description>}
  />
);

Component.Loading = SubCategoryCardLoading;
export const SubCategoryCard = Component;
