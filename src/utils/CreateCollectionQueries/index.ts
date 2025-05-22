import { CollectionKey } from '@/constants';
import {
  MutationFunction,
  QueryClient,
  QueryFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import Case from 'case';
import {
  CollectionMethodName,
  ControllerConstructor,
  CreateCollectionQueriesResult,
} from './types';
import { CollectionItem } from '@/core/models/CollectionItem';

export class CreateCollectionQueries {
  private static getMethodType = (name: CollectionMethodName) => {
    if (['list', 'item', 'search'].some((s) => name.startsWith(s))) {
      return 'Query';
    }

    if (['create', 'update', 'delete'].some((s) => name.startsWith(s))) {
      return 'Mutation';
    }

    return undefined;
  };

  private static getMethodName = (
    key: CollectionKey,
    name: CollectionMethodName
  ) => {
    const methodType = this.getMethodType(name);
    const methodName =
      methodType == 'Query'
        ? name.replace('fetch', '')
        : name.replace('Item', '');

    return `use${key}${Case.pascal(methodName as string)}`;
  };

  private static getQueryOptions = ({
    method,
    args,
    key,
    name,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    method: Function;
    args: unknown[];
    key: CollectionKey;
    name: string;
  }) => {
    const stringArg = args?.length === 1 && typeof args?.at(0) === 'string';
    const queryArg = args?.length === 1 && typeof args?.at(0) === 'object';

    let fn: QueryFunction | MutationFunction;
    let queryKey: (CollectionKey | string)[] = [key];

    switch (true) {
      case this.getMethodType(name) === 'Mutation':
        fn = (newArgs: unknown) => method(newArgs);
        break;
      case stringArg:
        queryKey = [...queryKey, `id:${args.at(0) as string}`];
        fn = () => method(args.at(0) as string);
        break;
      case queryArg: {
        const otherKeys = Object.entries((args.at(0) as object) || {}).reduce(
          (acc: string[], [key, values]) => [
            ...acc,
            ...values.map((v: string) => `${key}:${v}`),
          ],
          []
        );

        queryKey = [...queryKey, ...otherKeys];
        fn = () => method(args.at(0));
        break;
      }
      default:
        fn = () => method();
        break;
    }

    return { queryKey, fn };
  };

  static createQueries = <T extends CollectionKey, R extends CollectionItem>(
    ControllerClass: ControllerConstructor
  ): CreateCollectionQueriesResult<T, R> => {
    const controller = new ControllerClass();

    return Object.entries(controller).reduce((acc, [name, method]) => {
      if (typeof method !== 'function') return acc;

      const methodType = this.getMethodType(name);

      if (!methodType) return acc;

      const methodName = this.getMethodName(controller.key, name);

      if (methodType === 'Query') {
        return {
          ...acc,
          [methodName]: (...args: unknown[]) => {
            const { fn: queryFn, queryKey } = this.getQueryOptions({
              name,
              method,
              args,
              key: controller.key,
            });

            return useQuery({ queryKey, queryFn });
          },
        };
      }

      if (methodType === 'Mutation') {
        return {
          ...acc,
          [methodName]: (...args: unknown[]) => {
            const { fn } = this.getQueryOptions({
              name,
              method,
              args,
              key: controller.key,
            });

            return useMutation<void>({
              mutationFn: fn as MutationFunction<void>,
              onSuccess: () => {
                const queryClient = new QueryClient();
                queryClient.invalidateQueries({ queryKey: [controller.key] });
              },
            });
          },
        };
      }

      return acc;
    }, {} as CreateCollectionQueriesResult<T, R>);
  };
}
