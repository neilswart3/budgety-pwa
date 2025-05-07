import { CreateTransaction } from './Create';
import { EditTransaction } from './Edit';
import { ListTransactions } from './List';
import { SingleTransaction } from './Single';

export const Transactions = {
  List: ListTransactions,
  Create: CreateTransaction,
  Single: SingleTransaction,
  Edit: EditTransaction,
};
