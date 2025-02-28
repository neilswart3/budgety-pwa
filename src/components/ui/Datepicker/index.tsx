import ReactDatePicker from "react-datepicker";
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
    />
  );
};
