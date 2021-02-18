import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {BankProgram} from '../../../model/bank-program';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Client} from '../../../model/client';
import {Agreement} from '../../../model/agreement';
import {Account} from '../../../model/account';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-deposit-agreement-dialog',
  templateUrl: './new-deposit-agreement-dialog.component.html',
  styleUrls: ['./new-deposit-agreement-dialog.component.scss']
})
export class NewDepositAgreementDialogComponent implements OnInit {

  bankPrograms: BankProgram[] = [];
  clients: Client[] = [];

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
    private dialogRef: MatDialogRef<NewDepositAgreementDialogComponent>
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
      activity: 'Passive'
    };
    const percentAccount: Account = {
      type: 'Percent',
      accountNumber: this.getRandomString(13),
      activity: 'Passive'
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
    this.http.getDepositBankPrograms().subscribe((bankPrograms: BankProgram[]) => {
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

}
