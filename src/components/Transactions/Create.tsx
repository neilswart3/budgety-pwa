import { Fieldset, Grid, GridItem, Input, Stack } from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";
import { Field, Datepicker } from "@/components/ui";
import Case from "case";

const initValues = {
  name: "",
  description: "",
  date: new Date(),
  salaryMonth: new Date(),
  amount: 0,
  category: "",
  source: "",
};

type Values = typeof initValues;
type ValuesKey = keyof Values;

export const CreateTransaction: React.FC = () => {
  const [values, setValues] = useState<Values>({ ...initValues });

  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string | null | undefined | Date };
  }) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Fieldset.Root>
      <Grid
        as="form"
        gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))"
        gap={8}
        onChange={
          handleChange as unknown as ChangeEventHandler<HTMLInputElement>
        }
      >
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Basic info</Fieldset.Legend>
          <Fieldset.Content>
            {["name", "description", "category", "source"].map(name => (
              <Field key={name} label={Case.title(name)}>
                <Input
                  name={name}
                  value={values[name as ValuesKey] as string}
                />
              </Field>
            ))}
          </Fieldset.Content>
        </GridItem>
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Transaction Date</Fieldset.Legend>
          <Fieldset.Content>
            <Field label="Date">
              <Datepicker
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Field>
            <Field label="Salary Month">
              <Datepicker
                name="salaryMonth"
                value={values.salaryMonth}
                monthYearPicker
                onChange={handleChange}
              />
            </Field>
          </Fieldset.Content>
        </GridItem>
      </Grid>
    </Fieldset.Root>
  );
};
