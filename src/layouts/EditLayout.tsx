import { Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  loading: boolean;
}

export const EditLayout: React.FC<Props> = ({ loading, children }) => {
  if (loading) return <div>Loading ....</div>;

  return <Stack>{children}</Stack>;
};
