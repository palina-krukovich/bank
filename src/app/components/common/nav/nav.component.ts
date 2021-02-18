import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Transaction} from '../../../model/transaction';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentDate = '';

  bankTransactions: Transaction[] = [];

  constructor(
    private http: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  closeBankDay(): void {
    this.http.closeBankDay().subscribe(() => {
      this.snackBar.open('Bank Day successfully closed!');
      this.loadData();
    });
  }

  getBankAmount(currency: string): number {
    const debit = this.getDebit(currency);
    const credit = this.getCredit(currency);
    return credit - debit;
  }

  private getDebit(currency: string): number {
    return this.bankTransactions
      .filter((transaction: Transaction) => transaction.currency === currency)
      .map((transaction: Transaction) => transaction.debit || 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }

  private getCredit(currency: string): number {
    return this.bankTransactions
      .filter((transaction: Transaction) => transaction.currency === currency)
      .map((transaction: Transaction) => transaction.credit || 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }

  loadData(): void {
    this.http.getBankDate().subscribe((date: string) => {
      this.currentDate = date;
    });
    this.http.getTransactionsByAccount(1).subscribe((transactions: Transaction[]) => {
      this.bankTransactions = transactions;
    });
  }

}
