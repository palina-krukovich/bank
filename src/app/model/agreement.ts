import {Client} from './client';
import {BankProgram} from './bank-program';
import {Account} from './account';

export interface Agreement {
  id?: number;
  agreementNumber: string;
  client: Client;
  bankProgram: BankProgram;
  startDate: string;
  period: number;
  amount: number;
  currentAccount: Account;
  percentAccount: Account;
  active: boolean;
}
