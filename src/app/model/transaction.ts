import {Account} from './account';

export interface Transaction {
  id?: number;
  debit?: number;
  credit?: number;
  account: Account;
  transactionReason: string;
  currency: string;
}
