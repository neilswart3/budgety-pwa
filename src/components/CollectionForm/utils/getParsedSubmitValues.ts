import { InputTypes } from '@/core/models/CollectionItem/types';

interface GetParsedSubmitValues {
  values: object;
  inputTypes: InputTypes<object>;
}

export const getParsedSubmitValues = ({
  values,
  inputTypes,
}: GetParsedSubmitValues) => {
  return Object.entries(values).reduce((acc, [name, value]) => {
    const type = inputTypes[name as keyof typeof inputTypes];

    let val;
    switch (true) {
      case /number/gi.test(type):
        val = parseFloat(value as string);
        break;
      case /date|month/gi.test(type):
        val = new Date(value as string);
        break;
      default:
        val = value;
        break;
    }

    return { ...acc, [name]: val };
  }, {});
};
