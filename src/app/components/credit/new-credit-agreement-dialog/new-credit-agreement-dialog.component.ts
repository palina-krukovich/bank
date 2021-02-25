import {Component, OnInit, ViewChild} from '@angular/core';
import {BankProgram} from '../../../model/bank-program';
import {Client} from '../../../model/client';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpService} from '../../../services/http.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Account} from '../../../model/account';
import {Agreement} from '../../../model/agreement';
import {ChartDataSets} from 'chart.js';
import {BaseChartDirective, Label} from 'ng2-charts';

@Component({
  selector: 'app-new-credit-agreement-dialog',
  templateUrl: './new-credit-agreement-dialog.component.html',
  styleUrls: ['./new-credit-agreement-dialog.component.scss']
})
export class NewCreditAgreementDialogComponent implements OnInit {

  bankPrograms: BankProgram[] = [];
  clients: Client[] = [];

  public payments: ChartDataSets[] = [
    {data: [], label: 'Percent Account Amount'},
    {data: [], label: 'Current Account Amount'},
    {data: [], label: 'Total Amount'}
  ];

  public months: Label[] = [];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective | undefined;

  agreementNumberControl = this.fb.control('', [
    Validators.required,
    Validators.pattern('[0-9]+')
  ]);

  clientControl = this.fb.control(1, [
    Validators.required
  ]);

  bankProgramControl = this.fb.control(1, [
    Validators.required
  ]);

  startDateControl = this.fb.control('', [
    Validators.required
  ]);

  periodControl = this.fb.control(0, [
    Validators.required
  ]);

  amountControl = this.fb.control(null, [
    Validators.required
  ]);

  formGroup = this.fb.group({
    agreementNumber: this.agreementNumberControl,
    client: this.clientControl,
    bankProgram: this.bankProgramControl,
    startDate: this.startDateControl,
    period: this.periodControl,
    amount: this.amountControl
  });


  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<NewCreditAgreementDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  get formReady(): boolean {
    return this.formGroup.valid && this.validatePeriod() && this.validateAmount();
  }

  get currentBankProgram(): BankProgram {
    return this.bankPrograms.filter((bankProgram: BankProgram) => {
      return bankProgram.id === this.bankProgramControl.value;
    })[0];
  }

  validatePeriod(): boolean {
    return this.periodControl.value >= (this.currentBankProgram.minPeriod || 0)
      && this.periodControl.value <= (this.currentBankProgram.maxPeriod || Number.MAX_SAFE_INTEGER);
  }

  validateAmount(): boolean {
    return this.amountControl.value >= (this.currentBankProgram.minAmount || 0)
      && this.amountControl.value <= (this.currentBankProgram.maxAmount || Number.MAX_SAFE_INTEGER);
  }

  save(): void {
    const currentAccount: Account = {
      type: 'Current',
      accountNumber: this.getRandomString(13),
      activity: 'Active'
    };
    const percentAccount: Account = {
      type: 'Percent',
      accountNumber: this.getRandomString(13),
      activity: 'Active'
    };
    const agreement: Agreement = {
      agreementNumber: this.agreementNumberControl.value,
      client: this.clients.filter((c: Client) => c.id === this.clientControl.value)[0],
      bankProgram: this.bankPrograms.filter((bp: BankProgram) => bp.id === this.bankProgramControl.value)[0],
      startDate: this.startDateControl.value,
      period: this.periodControl.value,
      amount: this.amountControl.value,
      active: true,
      currentAccount,
      percentAccount
    };
    this.http.addAgreement(agreement).subscribe(() => {
      this.snackBar.open('Agreement created successfully!');
      this.dialogRef.close();
    });
  }

  private loadData(): void {
    this.http.getCreditBankPrograms().subscribe((bankPrograms: BankProgram[]) => {
      this.bankPrograms = bankPrograms;
    });
    this.http.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  private getRandomString(length: number): string {
    const randomChars = '1234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  calculatePayments(): void {
    const bankProgram = this.bankPrograms.filter((bp: BankProgram) => bp.id === this.bankProgramControl.value)[0];
    this.months = [];
    this.payments[0].data = [];
    this.payments[1].data = [];
    this.payments[2].data = [];
    let creditDebt = this.amountControl.value;
    const amount = this.amountControl.value;
    const period = this.periodControl.value;
    if (bankProgram.payType === 'Annuity') {
      for (let i = 0; i < period; i++) {
        this.months.push(i.toString());
        const monthlyRate = bankProgram.percentRate / 100 / 12;
        const monthlyPay = amount * (monthlyRate + monthlyRate / (Math.pow(1 + monthlyRate, period) - 1));
        const percentAmount = creditDebt * monthlyRate;
        const currentAmount = monthlyPay - percentAmount;
        this.payments[0].data.push(percentAmount);
        this.payments[1].data.push(currentAmount);
        this.payments[2].data.push(monthlyPay);
        creditDebt -= currentAmount;
      }
    } else {
      for (let i = 0; i < period; i++) {
        this.months.push(i.toString());
        const monthlyRate = bankProgram.percentRate / 100 / 12;
        const currentAmount = amount / period;
        const percentAmount = creditDebt * monthlyRate;
        this.payments[0].data.push(percentAmount);
        this.payments[1].data.push(currentAmount);
        this.payments[2].data.push(percentAmount + currentAmount);
        creditDebt -= currentAmount;
      }
    }
    this.chart?.update();
  }
}
