export interface IBaseCollectionItem {
  id: string;
  name: string;
  created: Date;
  modified: Date;
  createdBy: string;
}

export interface IBaseCategoryItem {
  description: string;
}

export interface IBaseAccountItem {
  description: string;
  monthBudgetAmount: number;
}

export enum TransactionItemTypeField {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export interface IBaseTransactionItem {
  description: string;
  type: TransactionItemTypeField;
  amount: number;
  user: string;
  category: string;
  source: string;
  location: string;
  date: Date;
  salaryMonth: Date;
}

type IBaseItems = IBaseTransactionItem | IBaseAccountItem | IBaseCategoryItem;

export type IBaseModelPayload<
  T extends IBaseItems = IBaseItems,
  B extends IBaseCollectionItem = IBaseCollectionItem,
  Required extends keyof B = 'name',
  Optional extends keyof B = 'id' | 'created' | 'createdBy'
> = T & Pick<B, Required> & Partial<Pick<B, Optional>>;

export type ICategoryItem = IBaseCollectionItem & IBaseCategoryItem;
export type IAccountItem = IBaseCollectionItem & IBaseAccountItem;
export type ITransactionItem = IBaseCollectionItem & IBaseTransactionItem;
