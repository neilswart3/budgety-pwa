import { SyntheticEvent } from 'react';

export type UseFormHandleChangePayload<V extends object> = {
  target: { name: keyof V; value: string | null | undefined };
};

export type UseFormHandleChange<V extends object = object> = (
  e: UseFormHandleChangePayload<V>
) => void;
export type UseFormHandleSubmit<T = SyntheticEvent> = (
  paylod: T
) => void | Promise<void>;
export type UseFormHandleResetValue<V extends object> = (key: keyof V) => void;
