import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`http://localhost:8080/client`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`http://localhost:8080/client`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`http://localhost:8080/client`, client);
  }

  removeClient(clientId: number): Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/client`, {params: new HttpParams().set('id', clientId.toString())});
  }
}
