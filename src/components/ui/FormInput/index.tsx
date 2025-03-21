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
import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';
import { ChangeEvent } from 'react';

interface Props {
  name: string;
  label?: string;
  value: string | number | undefined;
  required?: boolean;
  options?: { value: string; label: string; id: string }[];
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
          borderRadius="md"
          p={1}
          bg="bg.muted"
          defaultValue={value as string}
          w="full"
          onValueChange={({ value }) =>
            onChange({
              target: { name, value },
            } as ChangeEvent<HTMLInputElement>)
          }
        >
          <HStack>
            {options.map(({ id, value }) => (
              <RadioCardItem
                border="none"
                borderRadius="sm"
                _checked={{ bg: 'bg', boxShadow: 'xs' }}
                key={`${name}-${Case.kebab(id)}`}
                label={value}
                value={id}
                indicator={false}
                icon={
                  <Icon size="lg">
                    {value.toLowerCase() === 'expense' ? (
                      <IoRemoveCircleSharp />
                    ) : (
                      <IoAddCircleSharp />
                    )}
                  </Icon>
                }
              />
            ))}
          </HStack>
        </RadioCardRoot>
      </Field>
    );

  if (['category', 'source', 'user'].includes(name) && options?.length) {
    const collection = createListCollection({ items: options });

    return (
      <Field label={label}>
        <SelectRoot
          collection={collection}
          name={name}
          value={[value] as unknown as string[]}
          onValueChange={({ value }) =>
            onChange({
              target: { value: value[0], name },
            } as ChangeEvent<HTMLInputElement>)
          }
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
