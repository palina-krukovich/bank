import {Component, OnInit} from '@angular/core';
import {BankProgram} from '../../model/bank-program';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-bank-program',
  templateUrl: './bank-program.component.html',
  styleUrls: ['./bank-program.component.scss']
})
export class BankProgramComponent implements OnInit {

  depositPrograms: BankProgram[] = [];
  creditPrograms: BankProgram[] = [];
  columns = ['name', 'payType', 'currency', 'percentRate', 'minPeriod', 'maxPeriod', 'minAmount', 'maxAmount'];
  displayedColumns = [
    {name: 'name', displayName: 'Name'},
    {name: 'payType', displayName: 'Pay Type'},
    {name: 'currency', displayName: 'Currency'},
    {name: 'percentRate', displayName: 'Percent Rate'},
    {name: 'minPeriod', displayName: 'Min Period'},
    {name: 'maxPeriod', displayName: 'Max Period'},
    {name: 'minAmount', displayName: 'Min Amount'},
    {name: 'maxAmount', displayName: 'Max Amount'},
  ];

  constructor(
    private http: HttpService
  ) {
  }

  ngOnInit(): void {
    this.loadBankPrograms();
  }

  private loadBankPrograms(): void {
    this.http.getDepositBankPrograms().subscribe((bankPrograms: BankProgram[]) => {
      this.depositPrograms = bankPrograms;
    });
    this.http.getCreditBankPrograms().subscribe((bankPrograms: BankProgram[]) => {
      this.creditPrograms = bankPrograms;
    });
  }

}
