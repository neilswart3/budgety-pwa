import {
  Fieldset,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ChangeEventHandler, useState } from "react";
import { Field, Datepicker } from "@/components/ui";
import Case from "case";
import { IoReload } from "react-icons/io5";

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

  const handleResetDate = (name: "date" | "salaryMonth") => {
    setValues(prev => ({ ...prev, [name]: new Date() }));
  };

  return (
    <Fieldset.Root>
      <Grid
        as="form"
        gridTemplateColumns="repeat(auto-fit, minmax(20rem, 1fr))"
        gap={8}
      >
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Basic info</Fieldset.Legend>
          <Fieldset.Content>
            {["name", "description", "category", "source"].map(name => (
              <Field key={name} label={Case.title(name)}>
                <Input
                  name={name}
                  value={values[name as ValuesKey] as string}
                  onChange={
                    handleChange as unknown as ChangeEventHandler<HTMLInputElement>
                  }
                />
              </Field>
            ))}
          </Fieldset.Content>
        </GridItem>
        <GridItem as={Stack} gap={4}>
          <Fieldset.Legend>Transaction Date</Fieldset.Legend>
          <Fieldset.Content alignItems="start">
            <Field
              label={
                <HStack justify="space-between" w="full">
                  Date
                  <IconButton
                    variant="subtle"
                    bg="bg.subtle"
                    onClick={() => handleResetDate("date")}
                  >
                    <Icon>
                      <IoReload />
                    </Icon>
                  </IconButton>
                </HStack>
              }
            >
              <Datepicker
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Field>
            <Field
              label={
                <HStack justify="space-between" w="full">
                  Salary Month
                  <IconButton
                    variant="subtle"
                    bg="bg.subtle"
                    onClick={() => handleResetDate("salaryMonth")}
                  >
                    <Icon>
                      <IoReload />
                    </Icon>
                  </IconButton>
                </HStack>
              }
            >
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
