import { useCallback, useState } from 'react';
import {
  UseFormHandleChange,
  UseFormHandleResetValue,
  UseFormHandleSubmit,
} from './types';

interface UseFormPayload<V extends object> {
  initValues: V;
  onResetValue?: UseFormHandleResetValue<V>;
  onChange?: UseFormHandleChange<V>;
  onSubmit?: UseFormHandleSubmit<V>;
}

interface UseFormResult<V extends object> {
  values: V;
  handleResetValue: UseFormHandleResetValue<V>;
  handleChange: UseFormHandleChange<V>;
  handleSubmit: UseFormHandleSubmit;
}

export const useForm = <V extends object>({
  initValues,
  onChange,
  onResetValue,
  onSubmit,
}: UseFormPayload<V>): UseFormResult<V> => {
  const [values, setValues] = useState<V>(initValues);

  const handleResetValue: UseFormHandleResetValue<V> = useCallback(
    (key) => {
      setValues((prev) => ({ ...prev, [key]: initValues[key] }));

      if (onResetValue) onResetValue(key);
    },
    [initValues, onResetValue]
  );

  const handleChange: UseFormHandleChange<V> = useCallback(
    (payload) => {
      const { name, value } = payload.target;

      setValues((prev) => ({ ...prev, [name]: value }));

      if (onChange) onChange(payload);
    },
    [onChange]
  );

  const handleSubmit: UseFormHandleSubmit = useCallback(
    async (e) => {
      try {
        e?.preventDefault();

        if (onSubmit) await Promise.resolve(onSubmit(values));
      } catch (error) {
        console.log('error:', error);
      }
    },
    [onSubmit, values]
  );

  return { values, handleResetValue, handleChange, handleSubmit };
};
