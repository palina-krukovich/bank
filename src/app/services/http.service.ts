import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {environment} from '../../environments/environment';
import {BankProgram} from '../model/bank-program';
import {Agreement} from '../model/agreement';
import {Account} from '../model/account';
import {Transaction} from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiURL}client`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.apiURL}client`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.apiURL}client`, client);
  }

  removeClient(clientId: number): Observable<any> {
    return this.http.delete(`${environment.apiURL}client`, {params: new HttpParams().set('id', clientId.toString())});
  }

  getDepositBankPrograms(): Observable<BankProgram[]> {
    return this.http.get<BankProgram[]>(`${environment.apiURL}bank-program/deposit`);
  }

  getCreditBankPrograms(): Observable<BankProgram[]> {
    return this.http.get<BankProgram[]>(`${environment.apiURL}bank-program/credit`);
  }

  closeBankDay(): Observable<any> {
    return this.http.put(`${environment.apiURL}close-bank-day`, null);
  }

  getDepositAgreements(): Observable<Agreement[]> {
    return this.http.get<Agreement[]>(`${environment.apiURL}agreement/deposit`);
  }

  getCreditAgreements(): Observable<Agreement[]> {
    return this.http.get<Agreement[]>(`${environment.apiURL}agreement/credit`);
  }

  addAgreement(agreement: Agreement): Observable<Agreement> {
    return this.http.post<Agreement>(`${environment.apiURL}agreement`, agreement);
  }

  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      `${environment.apiURL}transaction/account`,
      {params: new HttpParams().set('accountId', accountId.toString())});
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.apiURL}transaction`);
  }

  getBankDate(): Observable<string> {
    return this.http.get<string>(`${environment.apiURL}bank-date`);
  }
}
