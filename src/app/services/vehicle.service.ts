import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as uri from '../config/uriConfig';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  mainUrl = `${uri.uri}veiculo`;

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Access-Control-Allow-Origin': '*' },
    ),
  };

  loadVehicles(): Observable<any> {
    return this.httpClient.get(`${this.mainUrl}/listar`);
  }

  loadMeVehicles(userId: any): Observable<any> {
    return this.httpClient.get(`${this.mainUrl}/alugados`, {params: {userId: userId}});
  }

  quitVehicle(rentInformation: any): Observable<any> {
    const {user_id, vehicle_id} = rentInformation;
    return this.httpClient.delete(`${this.mainUrl}/alugar`, {params: {userId: user_id, vehicleId: vehicle_id}});
  }

  rentVehicle(rentInformation: any): Observable<any> {
    return this.httpClient.post(`${this.mainUrl}/alugar`, rentInformation);
  }
}
