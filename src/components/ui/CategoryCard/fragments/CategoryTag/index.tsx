import { CategoryTagTemplate } from './Template';
import Case from 'case';
import { CategoryTagLoading } from './Loading';
import { MdIcon } from '@/components/ui/MdIcon';

interface Props {
  id: string;
  name: string;
  icon: string;
}

const Component: React.FC<Props> & { Loading: React.FC } = ({ name, icon }) => (
  <CategoryTagTemplate icon={<MdIcon icon={icon} />} label={Case.title(name)} />
);

Component.Loading = CategoryTagLoading;
export const CategoryTag = Component;
