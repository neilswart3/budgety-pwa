import { CollectionKey } from '@/constants';
import { CollectionController } from '@/core/controllers/CollectionController';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

export type CollectionMethodName = Omit<keyof CollectionController, 'key'>;

export type ControllerConstructor<
  T extends CollectionController = CollectionController
> = new () => T;

type CollectionQueriesResult<T extends CollectionKey> = {
  [key in `use${T}${'Item' | 'List' | 'Search'}`]: (
    ...args: unknown[]
  ) => UseQueryResult;
};

type CollectionMutationsResult<T extends CollectionKey> = {
  [key in `use${T}${'Create' | 'Delete' | 'Update'}`]: (
    ...args: unknown[]
  ) => UseMutationResult;
};

export type CreateCollectionQueriesResult<T extends CollectionKey> =
  CollectionQueriesResult<T> & CollectionMutationsResult<T>;
