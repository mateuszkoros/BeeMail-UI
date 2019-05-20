import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../models/message';
import { BackendResponse } from '../models/backend-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private http: HttpClient) {}

  sendMail(message: Message): Observable<BackendResponse> {
    const toSend = new FormData();
    toSend.append('Subject', message.subject);
    toSend.append('Message', message.message);
    toSend.append('Destination', message.remoteAddress);
    return this.http.post<BackendResponse>(environment.sendMessageUrl, toSend)
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Failed to send message:', error.error.message);
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    return throwError(
        'Failed to send message');
  }
}
