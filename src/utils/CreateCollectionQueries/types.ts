/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionKey } from '@/constants';
import { CollectionController } from '@/core/controllers/Collection.Controller';
import { CollectionItem } from '@/core/models/CollectionItem';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type CollectionMethodName = Omit<keyof CollectionController, 'key'>;
type CollectionMethodImplementation = Exclude<
  CollectionController[keyof CollectionController],
  CollectionKey
>;

export type ControllerConstructor<
  T extends CollectionController = CollectionController
> = new () => T;

enum ControllerBaseMethodName {
  LIST = 'List',
  ITEM = 'Item',
  SEARCH = 'Search',
  CREATE = 'Create',
  DELETE = 'Delete',
  UPDATE = 'Update',
}

type CollectionQueryHookItem<
  T extends CollectionKey,
  K extends ControllerBaseMethodName,
  //   R extends (args: unknown[]) => UseMutationResult | UseQueryResult
  R extends CollectionMethodImplementation
> = {
  //   [key in `use${T}${K}`]: K extends
  //     | ControllerBaseMethodName.CREATE
  //     | ControllerBaseMethodName.DELETE
  //     | ControllerBaseMethodName.UPDATE
  //     ? UseMutationResult
  //     : UseQueryResult;
  [key in `use${T}${K}`]: R;
};

// type CollectionQueriesResult<T extends CollectionKey> = {
//   [key in `use${T}${'Item' | 'List' | 'Search'}`]: (
//     ...args: unknown[]
//   ) => UseQueryResult;
// };

// type CollectionMutationsResult<T extends CollectionKey> = {
//   [key in `use${T}${'Create' | 'Delete' | 'Update'}`]: (
//     ...args: unknown[]
//   ) => UseMutationResult;
// };

// export type CreateCollectionQueriesResult<T extends CollectionKey> =
//   CollectionQueriesResult<T> & CollectionMutationsResult<T>;

export type CreateCollectionQueriesResult<
  T extends CollectionKey,
  Result extends CollectionItem
> = CollectionQueryHookItem<
  T,
  ControllerBaseMethodName.LIST,
  //@ts-expect-error
  () => UseQueryResult<Result[]>
> &
  CollectionQueryHookItem<
    T,
    ControllerBaseMethodName.ITEM,
    //@ts-expect-error
    (id: string) => UseQueryResult<Result>
  > &
  CollectionQueryHookItem<
    T,
    ControllerBaseMethodName.SEARCH,
    //@ts-expect-error
    (query: object) => UseQueryResult<Result[]>
  > &
  CollectionQueryHookItem<
    T,
    ControllerBaseMethodName.CREATE,
    //@ts-expect-error
    (payload: object) => UseMutationResult<void>
  > &
  CollectionQueryHookItem<
    T,
    ControllerBaseMethodName.UPDATE,
    //@ts-expect-error
    (payload: object) => UseMutationResult<void>
  > &
  CollectionQueryHookItem<
    T,
    ControllerBaseMethodName.DELETE,
    //@ts-expect-error
    (id: string) => UseMutationResult<void>
  >;
