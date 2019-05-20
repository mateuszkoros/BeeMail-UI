import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BackendResponse } from '../models/backend-response';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteMailService {

  constructor(private http: HttpClient) { }

  deleteMessage(id: number) {
    const toSend = new FormData();
    toSend.append('Id', id.toString());
    return this.http.request<BackendResponse>('delete', environment.deleteMessageUrl, {body: toSend})
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Failed to delete message:', error.error.message);
    } else {
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    return throwError(
        'Failed to delete message');
  }
}
