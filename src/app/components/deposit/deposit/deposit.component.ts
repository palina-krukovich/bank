import {Component, OnInit, ViewChild} from '@angular/core';
import {Agreement} from '../../../model/agreement';
import {HttpService} from '../../../services/http.service';
import {MatDialog} from '@angular/material/dialog';
import {NewDepositAgreementDialogComponent} from '../new-deposit-agreement-dialog/new-deposit-agreement-dialog.component';
import {MatTable} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Transaction} from '../../../model/transaction';
import {Account} from '../../../model/account';
import {TransactionDialogComponent} from '../../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DepositComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<Agreement> | undefined;

  agreements: Agreement[] = [];
  transactions: Transaction[] = [];

  columns = ['agreementNumber', 'startDate', 'period', 'amount', 'active'];
  displayedColumns = [
    {name: 'agreementNumber', displayName: 'Agreement Number'},
    {name: 'startDate', displayName: 'Start Date'},
    {name: 'period', displayName: 'Period, months'},
    {name: 'amount', displayName: 'Amount'},
    {name: 'active', displayName: 'Active'}
  ];

  expandedElement: Agreement | null = null;

  constructor(
    private http: HttpService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  getDebit(account: Account): number {
    return this.transactions
      .filter((transaction: Transaction) => transaction.account.id === account.id)
      .map((transaction: Transaction) => transaction.debit || 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }

  getCredit(account: Account): number {
    return this.transactions
      .filter((transaction: Transaction) => transaction.account.id === account.id)
      .map((transaction: Transaction) => transaction.credit || 0)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  }

  getSaldo(account: Account): number {
    const debit = this.getDebit(account);
    const credit = this.getCredit(account);
    return account.activity === 'Passive' ? credit - debit : debit - credit;
  }

  openTransactionsDialog(agreement: Agreement): void {
    this.dialog.open(TransactionDialogComponent, {
      hasBackdrop: true,
      width: '75%',
      data: {
        accountCurrent: agreement.currentAccount,
        accountPercent: agreement.percentAccount
      }
    });
  }

  openNewDepositAgreementDialog(): void {
    const dialogRef = this.dialog.open(NewDepositAgreementDialogComponent, {
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.http.getDepositAgreements().subscribe((agreements: Agreement[]) => {
      this.agreements = agreements;
      this.table?.renderRows();
    });
    this.http.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
      this.table?.renderRows();
    });
  }

}
