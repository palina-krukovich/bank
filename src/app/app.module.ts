import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClientsComponent } from './components/clients/clients.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavComponent } from './components/nav/nav.component';
import {MaterialModule} from './material/material.module';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewClientDialogComponent } from './components/new-client-dialog/new-client-dialog.component';
import {NgxMaskModule} from 'ngx-mask';
import { EditClientDialogComponent } from './components/edit-client-dialog/edit-client-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    NavComponent,
    NewClientDialogComponent,
    EditClientDialogComponent,
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
    NgxMaskModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
