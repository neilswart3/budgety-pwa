import { Box, Button, IconButton } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import { IconType } from "react-icons";

interface Props {
  name: string;
  value: Date;
  monthYearPicker?: boolean;
  icon?: IconType;
  onChange: (e: {
    target: { name: string; value: string | null | undefined | Date };
  }) => void;
}

const fmt = {
  d: "dd",
  m: "MMMM",
  y: "yyyy",
};

export const Datepicker: React.FC<Props> = ({
  name,
  value,
  monthYearPicker = false,
  onChange,
}) => {
  const handleChange = (value: Date | null) =>
    onChange({ target: { name, value } });

  return (
    <ReactDatePicker
      name={name}
      startDate={value}
      inline
      selected={value}
      showMonthYearPicker={monthYearPicker}
      dateFormat={`${monthYearPicker ? "" : fmt.d} ${fmt.m} ${fmt.y}`.trim()}
      onChange={handleChange}
      calendarContainer={({
        className,
        children,
      }: PropsWithChildren<{ className: string }>) => (
        <Box bg="bg.subtle" color="fg" borderRadius={2}>
          <CalendarContainer className={className}>
            {children}
          </CalendarContainer>
        </Box>
      )}
      renderDayContents={(day: number) => (
        <IconButton bg="bg.emphasized" color="fg">
          {day}
        </IconButton>
      )}
      renderMonthContent={(_month, _shortMonth, longMonth) => (
        <Button bg="bg.emphasized" color="fg" w="full">
          {longMonth}
        </Button>
      )}
    />
  );
};
