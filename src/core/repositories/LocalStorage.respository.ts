import { CollectionKey } from '@/constants';
import { CollectionItem } from '../models/CollectionItem';

export class LocalStorageRepository<Data extends CollectionItem> {
  private key: `budgety-fake-${CollectionKey}`;

  constructor(key: CollectionKey) {
    this.key = `budgety-fake-${key}`;

    this.init();
  }

  private init = () => {
    if (!window.localStorage.getItem(this.key)) {
      window.localStorage.setItem(this.key, '[]');
    }
  };

  list = async (): Promise<Data[] | Error> => {
    try {
      const items = window.localStorage.getItem(this.key) || '[]';

      return await Promise.resolve(JSON.parse(items));
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  search = async (
    query: Partial<Record<keyof Data, string[]>> = {}
  ): Promise<Data[] | Error> => {
    try {
      const entries = (await this.list()) as Data[];

      const newEntries =
        Object.entries(query).reduce((acc: Data[], [key, values]) => {
          const newValues = values.reduce((vAcc: Data[], vCur: string) => {
            const item = entries.filter(
              (item) => item[key as keyof typeof item] === vCur
            );

            if (!item) return vAcc;

            return [...vAcc, ...item];
          }, []);

          return [...acc, ...newValues];
        }, []) || [];

      return await Promise.resolve(newEntries);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  item = async (id: string): Promise<Data | Error> => {
    try {
      const items = (await this.list()) as Data[];
      const itemIndex = items.findIndex((item) => item.id === id);

      if (itemIndex < 0) throw Error('This item does not exist.');

      return await Promise.resolve(items[itemIndex]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  create = async (payload: Data): Promise<void | Error> => {
    try {
      const items = (await this.list()) as Data[];

      if (items.find(({ id }) => id === payload.id)) {
        throw new Error('An item with this id already exists');
      }

      await Promise.resolve(
        window.localStorage.setItem(
          this.key,
          JSON.stringify([payload, ...items])
        )
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  update = async (payload: Data): Promise<void | Error> => {
    try {
      const items = (await this.list()) as Data[];
      const itemIndex = items.findIndex(({ id }) => id === payload.id);

      if (itemIndex < 0) throw new Error('This item does not exist');

      const newItems = items
        .slice(0, itemIndex)
        .concat([{ ...payload }])
        .concat(items.slice(itemIndex + 1));

      await Promise.resolve(
        window.localStorage.setItem(this.key, JSON.stringify(newItems))
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  delete = async (id: string): Promise<void | Error> => {
    try {
      const items = (await this.list()) as Data[];
      const itemIndex = items.findIndex((item) => item.id === id);

      if (itemIndex < 0) throw new Error('This item does not exist.');

      const newItems = items
        .slice(0, itemIndex)
        .concat(items.slice(itemIndex + 1));

      return await Promise.resolve(
        window.localStorage.setItem(this.key, JSON.stringify(newItems))
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
