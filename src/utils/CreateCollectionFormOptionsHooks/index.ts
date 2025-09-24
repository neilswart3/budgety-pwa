// import { CollectionKey } from '@/constants';
import { ControllerConstructor } from '../CreateCollectionQueries/types';
// import { CollectionItem } from '@/core/models/CollectionItem';
import { QueryClient } from '@tanstack/react-query';

export class CreateCollectionFormOptionsHooks {
  static create = async (
    /* <T extends CollectionKey, R extends CollectionItem> */ ControllerClass: ControllerConstructor
  ) => {
    try {
      const controller = new ControllerClass();
      const queryClient = new QueryClient();

      const entries = await queryClient.ensureQueryData({
        queryKey: [controller.key],
        queryFn: controller.list,
      });

      console.log('entries:', entries);

      //   console.log('queryClient:', queryClient);

      //   const entries = await controller.list();

      //   console.log('entries:', entries);
      //   console.log('controller:', controller);

      const name = `use${controller.key}FormOptions`;

      const func = () => {
        return [];
      };

      return { [name]: func };
    } catch (error) {
      console.log('error:', error);
    }
  };
}
