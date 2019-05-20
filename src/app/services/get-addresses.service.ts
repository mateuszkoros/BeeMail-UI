import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAddressesService {

  constructor(private http: HttpClient) {}

  getAllAddresses(): Observable<string[]> {
    return this.http.get<string[]>(environment.getAddressesUrl);
  }
}
