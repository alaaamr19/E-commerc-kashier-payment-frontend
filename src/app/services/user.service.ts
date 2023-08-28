import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = `${environment.baseUrl}/users`

  constructor(private httpClient: HttpClient) { }

  getUser() {
    const userData = localStorage.getItem('user');

    return JSON.parse(userData)?.user;
  }



  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client side error
      errorMessage = error.error.message;
    } else {
      // Get server side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getUserData(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/me')
      .pipe(catchError(this.errorHandler));
  }
}
