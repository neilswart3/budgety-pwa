import { Fieldset, Stack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
}

const FormBlock: React.FC<Props> = ({ title, children }) => (
  <Stack gap={4}>
    <Fieldset.Legend>{title}</Fieldset.Legend>
    <Fieldset.Content>{children}</Fieldset.Content>
  </Stack>
);

export default FormBlock;
