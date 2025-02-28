import { CreateTransaction } from "./Create";
import { EditTransaction } from "./Edit";
import { TransactionsList } from "./List";
import { SingleTransaction } from "./Single";

export const Transactions = {
  List: TransactionsList,
  Single: SingleTransaction,
  Create: CreateTransaction,
  Edit: EditTransaction,
};
