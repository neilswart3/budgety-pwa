import { Button, Fieldset, HStack, Stack } from '@chakra-ui/react';
import { PropsWithChildren, SyntheticEvent } from 'react';

interface Props extends PropsWithChildren {
  onSubmit: (e: SyntheticEvent) => void | Promise<void>;
  button: React.ReactNode;
}

const FormContainer: React.FC<Props> = ({ onSubmit, children, button }) => (
  <Stack as="form" gap={6} onSubmit={onSubmit}>
    <Fieldset.Root>{children}</Fieldset.Root>
    <HStack>
      <Button type="submit">{button}</Button>
    </HStack>
  </Stack>
);

export default FormContainer;
