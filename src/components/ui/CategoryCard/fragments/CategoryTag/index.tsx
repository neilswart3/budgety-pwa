// import { useMemo } from 'react';
// import * as mdIcons from 'react-icons/md';
import { CategoryTagTemplate } from './Template';
import Case from 'case';
import { CategoryTagLoading } from './Loading';
import { Box } from '@chakra-ui/react';

interface Props {
  id: string;
  name: string;
  icon: string;
}

const Component: React.FC<Props> & { Loading: React.FC } = ({ name, icon }) => {
  //   const TagIcon = useMemo(
  //     () => mdIcons[icon.trim() as keyof typeof mdIcons],
  //     [icon]
  //   );

  return (
    <CategoryTagTemplate
      //    icon={<TagIcon />}
      icon={<Box scale={0.5}>{icon}</Box>}
      label={Case.title(name)}
    />
  );
};

Component.Loading = CategoryTagLoading;
export const CategoryTag = Component;
