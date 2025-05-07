import { InputTypesValues } from '@/core/models/CollectionItem/types';
import {
  Select as ChSelect,
  createListCollection,
  Portal,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';

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
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  value,
  label,
  options,
  type = 'select',
}) => {
  const multiple = useMemo(() => type === 'multiSelect', [type]);
  const list = useMemo(
    () => createListCollection<SelectOption>({ items: options }),
    [options]
  );

  console.log('SelectField value:', value);

  return (
    <ChSelect.Root
      //   value={[value]}
      collection={list}
      multiple={multiple}
      closeOnSelect={!multiple}
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
