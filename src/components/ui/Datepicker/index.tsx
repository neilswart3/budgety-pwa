import { Box, Button, IconButton } from '@chakra-ui/react';
import { ChangeEvent, PropsWithChildren, useMemo } from 'react';
import ReactDatePicker, { CalendarContainer } from 'react-datepicker';
import { IconType } from 'react-icons';

interface Props {
  name: string;
  value: string;
  monthYearPicker?: boolean;
  icon?: IconType;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const fmt = { d: 'dd', m: 'MMMM', y: 'yyyy' };

export const Datepicker: React.FC<Props> = ({
  name,
  value,
  monthYearPicker = false,
  onChange,
}) => {
  const dateValue = useMemo(() => new Date(value), [value]);

  const handleChange = (value: Date | null) =>
    onChange({
      target: { name, value: value?.toISOString() },
    } as ChangeEvent<HTMLInputElement>);

  return (
    <ReactDatePicker
      name={name}
      startDate={dateValue}
      selected={dateValue}
      inline
      showMonthYearPicker={monthYearPicker}
      dateFormat={`${monthYearPicker ? '' : fmt.d} ${fmt.m} ${fmt.y}`.trim()}
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
