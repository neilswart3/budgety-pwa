import { InputTypes } from '@/core/models/CollectionItem/types';

interface Option {
  label: string;
  value: string;
}

type CollectionFormSelectOptionsMap<T extends object = object> = {
  [key in keyof T]: Option[];
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
      case /date/i.test(type as string):
        value = new Date().toISOString().split('T')[0];
        break;
      case /time/i.test(type as string):
        value = new Date().toISOString().split('Z')[0];
        break;
      case /month/i.test(type as string):
        value = new Date().toISOString().split('-').slice(0, 2).join('-');
        break;
      case /enum/i.test(type as string):
        value = (options[name as keyof typeof options] as Option[])?.at(
          0
        )?.value;
        break;
      default:
        value = '';
        break;
    }

    return { ...acc, [name]: value };
  }, {});
