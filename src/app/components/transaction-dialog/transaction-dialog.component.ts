import {Component, Inject, OnInit} from '@angular/core';
import {Account} from '../../model/account';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpService} from '../../services/http.service';
import {Transaction} from '../../model/transaction';

interface DialogData {
  accountCurrent?: Account;
  accountPercent?: Account;
  accountBank?: Account;
}

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss']
})
export class TransactionDialogComponent implements OnInit {

  currentAccountTransactions: Transaction[] = [];
  percentAccountTransactions: Transaction[] = [];
  bankAccountTransactions: Transaction[] = [];

  columns = ['debit', 'credit', 'currency', 'transactionReason'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  isActive(account: Account): boolean {
    return account.activity === 'Active';
  }

  private loadData(): void {
    if (!!this.data.accountCurrent && !!this.data.accountCurrent.id) {
      this.http.getTransactionsByAccount(this.data.accountCurrent.id).subscribe((transactions: Transaction[]) => {
        this.currentAccountTransactions = transactions;
      });
    }
    if (!!this.data.accountPercent && !!this.data.accountPercent.id) {
      this.http.getTransactionsByAccount(this.data.accountPercent.id).subscribe((transactions: Transaction[]) => {
        this.percentAccountTransactions = transactions;
      });
    }
    if (!!this.data.accountBank && !!this.data.accountBank.id) {
      this.http.getTransactionsByAccount(this.data.accountBank.id).subscribe((transactions: Transaction[]) => {
        this.bankAccountTransactions = transactions;
      });
    }
  }

}
