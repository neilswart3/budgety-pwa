import { ChangeEvent, useCallback } from 'react';
import { SelectOption } from '../SelectField';
import { Field, SegmentGroup } from '@chakra-ui/react';

interface Props {
  name: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const EnumField: React.FC<Props> = ({
  name,
  label,
  value,
  options,
  onChange,
}) => {
  const handleClick = useCallback(
    (value: string) => {
      onChange({ target: { name, value } } as ChangeEvent<HTMLInputElement>);
    },
    [name, onChange]
  );

  if (!options?.length) return null;

  return (
    <>
      <Field.Label>{label}</Field.Label>
      <SegmentGroup.Root value={value} w="full" colorPalette="green">
        <SegmentGroup.Indicator />
        {options.map(({ value, label }) => (
          <SegmentGroup.Item
            key={value}
            value={value}
            onClick={() => handleClick(value)}
            w="full"
            justifyContent="center"
          >
            {label}
          </SegmentGroup.Item>
        ))}
      </SegmentGroup.Root>
    </>
  );
};
