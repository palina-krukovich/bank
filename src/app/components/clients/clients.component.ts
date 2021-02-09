import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Client} from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import {NewClientDialogComponent} from '../new-client-dialog/new-client-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTable} from '@angular/material/table';
import {EditClientDialogComponent} from '../edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<Client> | undefined;

  clients: Client[] = [];
  displayedColumns: string[] = ['surname', 'name', 'middleName', 'birthDate', 'gender', 'passportSeries', 'passportNumber',
    'issuedBy', 'dateOfIssue', 'idNumber', 'placeOfBirth', 'actualResidenceCity', 'actualResidenceAddress', 'homeNumber',
    'mobileNumber', 'email', 'maritalStatus', 'nationality', 'disability', 'retired', 'monthlyIncome', 'boundToMilitaryService'];

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.httpService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  openNewClientDialog(): void {
    const dialogRef = this.dialog.open(NewClientDialogComponent, {
      hasBackdrop: true
    });
    dialogRef.componentInstance.newClientEvent.subscribe((client: Client) => {
      this.clients.push(client);
      this.table?.renderRows();
    });
  }

  openEditClientDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      hasBackdrop: true,
      data: {
        client
      }
    });
    dialogRef.componentInstance.editClientEvent.subscribe(() => {
      this.httpService.getClients().subscribe((clients: Client[]) => {
        this.clients = clients;
        this.table?.renderRows();
      });
    });
    dialogRef.componentInstance.deleteClientEvent.subscribe(() => {
      this.httpService.getClients().subscribe((clients: Client[]) => {
        this.clients = clients;
        this.table?.renderRows();
      });
    });
  }

}
