import {
  Field,
  RadioCardRoot,
  RadioCardItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  SelectContent,
  SelectItem,
} from '@/components/ui';
import Case from 'case';
import {
  createListCollection,
  HStack,
  Icon,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { IoAdd, IoRemove } from 'react-icons/io5';

interface Props {
  name: string;
  label?: string;
  value: string | number | undefined;
  required?: boolean;
  options?: { value: string; label: string; id: string }[];
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export const FormInput: React.FC<Props> = ({
  name,
  label: passedLabel,
  value,
  required = false,
  options,
  onChange,
}) => {
  const label = passedLabel || Case.title(name);
  const inputProps = { name, value, onChange, required };

  if (name === 'type' && options?.length)
    return (
      <Field label={label}>
        <RadioCardRoot
          defaultValue={value as string}
          w="full"
          onValueChange={({ value }) => onChange({ target: { name, value } })}
        >
          <HStack>
            {options.map(({ id, value }) => (
              <RadioCardItem
                key={`${name}-${Case.kebab(id)}`}
                label={value}
                value={id}
                indicator={false}
                icon={
                  <Icon size="lg">
                    {value.toLowerCase() === 'expense' ? (
                      <IoRemove />
                    ) : (
                      <IoAdd />
                    )}
                  </Icon>
                }
              />
            ))}
          </HStack>
        </RadioCardRoot>
      </Field>
    );

  if (['category', 'source'].includes(name) && options?.length) {
    const collection = createListCollection({ items: options });

    return (
      <Field label={label}>
        <SelectRoot
          collection={collection}
          name={name}
          value={value as unknown as string[]}
          onValueChange={({ value }) => {
            console.log('value:', value);

            return onChange({
              target: { value: value[0], name },
            });
          }}
        >
          <SelectTrigger>
            <SelectValueText placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {collection.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>
    );
  }

  if (name === 'description')
    return (
      <Field label={label}>
        <Textarea {...inputProps} rows={4} minH={10} maxH={200} />
      </Field>
    );

  if (name === 'number')
    return (
      <Field label={label}>
        <Input {...inputProps} type="number" min="0.00" step="0.01" />
      </Field>
    );

  return (
    <Field label={label}>
      <Input {...inputProps} />
    </Field>
  );
};
