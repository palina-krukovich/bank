import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Client} from '../../../model/client';
import {HttpService} from '../../../services/http.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NewClientDialogComponent} from '../new-client-dialog/new-client-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EditClientDialogComponent} from '../edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<Client> | undefined;

  clients: Client[] = [];
  columns = ['surname', 'name', 'middleName', 'birthDate', 'gender', 'city', 'address', 'citizenship', 'maritalStatus', 'monthlyIncome',
    'homeNumber', 'mobileNumber', 'email', 'Edit'];
  displayedColumns = [
    {name: 'surname', displayedName: 'Surname'},
    {name: 'name', displayedName: 'Name'},
    {name: 'middleName', displayedName: 'Middle Name'},
    {name: 'birthDate', displayedName: 'Birthday'},
    {name: 'gender', displayedName: 'Gender'},
    {name: 'city', displayedName: 'Current city'},
    {name: 'address', displayedName: 'Current address'},
    {name: 'citizenship', displayedName: 'Citizenship'},
    {name: 'maritalStatus', displayedName: 'Marital Status'},
    {name: 'monthlyIncome', displayedName: 'Monthly Income'},
    {name: 'homeNumber', displayedName: 'Home Number'},
    {name: 'mobileNumber', displayedName: 'Mobile Number'},
    {name: 'email', displayedName: 'Email'}
  ];

  expandedElement: Client | null = null;

  constructor(
    private httpService: HttpService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadClients();
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


  private loadClients(): void {
    this.httpService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }
}
