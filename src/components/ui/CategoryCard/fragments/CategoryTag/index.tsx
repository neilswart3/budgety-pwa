import { CategoryTagTemplate } from './Template';
import Case from 'case';
import { CategoryTagLoading } from './Loading';
import { MdIcon } from '@/components/ui/MdIcon';
import { ICategory } from '@/core';

type Props = Pick<ICategory, 'id' | 'name' | 'icon'>;

const Component: React.FC<Props> & { Loading: React.FC } = ({ name, icon }) => (
  <CategoryTagTemplate icon={<MdIcon icon={icon} />} label={Case.title(name)} />
);

Component.Loading = CategoryTagLoading;
export const CategoryTag = Component;
