import { InputTypes } from '@/core/models/CollectionItem/types';

interface Options {
  label: string;
  value: string;
}

type CollectionFormSelectOptionsMap<T extends object = object> = {
  [key in keyof T]: Options[];
};

interface GetFormInitValuesPayload {
  inputTypes: InputTypes<object>;
  options?: CollectionFormSelectOptionsMap<object>;
}

export const getFormEmptyValues = ({
  inputTypes,
  options = {},
}: GetFormInitValuesPayload) =>
  Object.entries(inputTypes).reduce((acc, [name, type]) => {
    let value;
    switch (true) {
      case /select/i.test(type as string):
        //   value = options ? options[name as keyof typeof options] : undefined;
        value = [];
        break;
      case /number/i.test(type as string):
        value = 0;
        break;
      default:
        value = '';
        break;
    }

    return { ...acc, [name]: value };
  }, {});
