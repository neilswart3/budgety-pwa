import { InputTypesValues } from '@/core/models/CollectionItem/types';
import {
  Select as ChSelect,
  createListCollection,
  Portal,
} from '@chakra-ui/react';
import { ChangeEvent, ReactElement, useMemo } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export type SelectFieldType = Extract<
  InputTypesValues,
  'select' | 'multiSelect'
>;

export interface SelectFieldProps {
  name: string;
  value: string;
  type: SelectFieldType;
  label: string | ReactElement;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value,
  label,
  options,
  type = 'select',
  onChange,
}) => {
  const multiple = useMemo(() => type === 'multiSelect', [type]);

  const list = useMemo(
    () => createListCollection<SelectOption>({ items: options }),
    [options]
  );

  return (
    <ChSelect.Root
      value={Array.isArray(value) ? value : [value]}
      //   defaultValue={[value]}
      multiple={multiple}
      collection={list}
      closeOnSelect={!multiple}
      onValueChange={({ value }) => {
        return onChange({
          target: {
            name,
            value: type === 'multiSelect' ? value : value.toString(),
          },
        } as unknown as ChangeEvent<HTMLSelectElement>);
      }}
    >
      <ChSelect.HiddenSelect />
      <ChSelect.Label>{label}</ChSelect.Label>
      <ChSelect.Control>
        <ChSelect.Trigger>
          <ChSelect.ValueText placeholder={`Select ${name}`} />
        </ChSelect.Trigger>
        <ChSelect.IndicatorGroup>
          {multiple && <ChSelect.ClearTrigger />}
          <ChSelect.Indicator />
        </ChSelect.IndicatorGroup>
      </ChSelect.Control>
      <Portal>
        <ChSelect.Positioner>
          <ChSelect.Content>
            {list.items.map((item) => (
              <ChSelect.Item item={item} key={item.value}>
                <span>
                  <ChSelect.ItemIndicator />
                </span>
                {item.label}
              </ChSelect.Item>
            ))}
          </ChSelect.Content>
        </ChSelect.Positioner>
      </Portal>
    </ChSelect.Root>
  );
};
