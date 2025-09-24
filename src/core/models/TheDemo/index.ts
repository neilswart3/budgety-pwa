import { CollectionItem } from '../CollectionItem';
import { InputTypes, InputValidations } from '../CollectionItem/types';
import { ITheDemo, ITheDemoPayload } from './types';

export class TheDemo extends CollectionItem implements ITheDemo {
  constructor({ ...args }: ITheDemoPayload) {
    super(args);
  }

  static inputTypes: InputTypes<ITheDemoPayload> = {
    ...CollectionItem.inputTypes,
  };

  static inputValidation: InputValidations<ITheDemoPayload> = {
    ...CollectionItem.inputValidation,
  };
}
