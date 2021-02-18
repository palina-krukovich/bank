import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/common/home/home.component';
import {DepositComponent} from './components/deposit/deposit/deposit.component';
import {CreditComponent} from './components/credit/credit/credit.component';
import {NotFoundComponent} from './components/common/not-found/not-found.component';
import {ClientComponent} from './components/client/client/client.component';
import {BankProgramComponent} from './components/bank-program/bank-program.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'deposit', component: DepositComponent},
  {path: 'credit', component: CreditComponent},
  {path: 'bank-program', component: BankProgramComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
