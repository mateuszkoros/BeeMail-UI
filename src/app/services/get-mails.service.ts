import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Message } from '../models/message';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GetMailsService {

    constructor(private http: HttpClient) {}

    getAllMailsWithAddress(address: string): Observable<Message[]> {
        const options = {
            params: new HttpParams().set(
                'address', address
            )
        };
        return this.http.get<Message[]>(environment.getMessagesUrl, options);
    }
}
