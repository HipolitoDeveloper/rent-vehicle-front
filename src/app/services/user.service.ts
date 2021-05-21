import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as uri from '../config/uriConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  mainUrl = `${uri.uri}usuario`;
  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  doSignIn(userData: any): Observable<any> {
    return this.httpClient.get(`${this.mainUrl}/entrar`, { params: userData });
  }

  doSignUp(userData: any): Observable<any> {
    return this.httpClient.post(`${this.mainUrl}/cadastrar`, userData );
  }

  doSignOut(username: any): Observable<any> {
    return this.httpClient.delete(`${this.mainUrl}`, { params: {username: username} } );
  }
}
