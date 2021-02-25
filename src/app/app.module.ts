import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavComponent} from './components/common/nav/nav.component';
import {MaterialModule} from './material/material.module';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewClientDialogComponent} from './components/client/new-client-dialog/new-client-dialog.component';
import {NgxMaskModule} from 'ngx-mask';
import {EditClientDialogComponent} from './components/client/edit-client-dialog/edit-client-dialog.component';
import {HomeComponent} from './components/common/home/home.component';
import {ClientComponent} from './components/client/client/client.component';
import {DepositComponent} from './components/deposit/deposit/deposit.component';
import {CreditComponent} from './components/credit/credit/credit.component';
import {NotFoundComponent} from './components/common/not-found/not-found.component';
import {BankProgramComponent} from './components/bank-program/bank-program.component';
import {NewDepositAgreementDialogComponent} from './components/deposit/new-deposit-agreement-dialog/new-deposit-agreement-dialog.component';
import {TransactionDialogComponent} from './components/transaction-dialog/transaction-dialog.component';
import { NewCreditAgreementDialogComponent } from './components/credit/new-credit-agreement-dialog/new-credit-agreement-dialog.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NewClientDialogComponent,
    EditClientDialogComponent,
    HomeComponent,
    ClientComponent,
    DepositComponent,
    CreditComponent,
    NotFoundComponent,
    BankProgramComponent,
    NewDepositAgreementDialogComponent,
    TransactionDialogComponent,
    NewCreditAgreementDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ChartsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
