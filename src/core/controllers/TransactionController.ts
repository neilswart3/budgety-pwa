import { CollectionKey } from '@/constants';
import { CollectionController } from './CollectionController';

export class TransactionController extends CollectionController {
  key = CollectionKey.TRANSACTIONS;

  fetchList = async () => {
    try {
      return await Promise.resolve([{ id: 't-0' }, { id: 't-1' }]);
    } catch (error) {
      console.log('error:', error);
    }
  };

  search = async (query = {}) => {
    try {
      return await Promise.resolve([
        { id: 't-0', query },
        { id: 't-1', query },
      ]);
    } catch (error) {
      console.log('error:', error);
    }
  };

  fetchItem = async (id: string) => {
    try {
      return await Promise.resolve({ id });
    } catch (error) {
      console.log('error:', error);
    }
  };

  createItem = async (payload = {}) => {
    try {
      await Promise.resolve(payload);
    } catch (error) {
      console.log('error:', error);
    }
  };

  updateItem = async (payload = {}) => {
    try {
      await Promise.resolve(payload);
    } catch (error) {
      console.log('error:', error);
    }
  };

  deleteItem = async (id: string) => {
    try {
      await Promise.resolve(id);
    } catch (error) {
      console.log('error:', error);
    }
  };
}
