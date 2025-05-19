import { Switch } from '@chakra-ui/react';

interface Props {
  label: React.ReactNode;
}

export const SwitchField: React.FC<Props> = ({ label }) => {
  return (
    <Switch.Root>
      <Switch.HiddenInput />
      <Switch.Label>{label}</Switch.Label>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
    </Switch.Root>
  );
};
