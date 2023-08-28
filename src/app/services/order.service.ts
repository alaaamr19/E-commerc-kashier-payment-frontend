import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl = `${environment.baseUrl}/orders`;
  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getByPage(page) {
    // get page of items from api
    return this.httpClient
      .get(this.baseUrl + `/?page=${page}`)
      .pipe(catchError(this.errorHandler));
  }
  getAll() {
    return this.httpClient
      .get(this.baseUrl + '/')
      .pipe(catchError(this.errorHandler));
  }

  placeOrder(cartItemsIds) {
    return this.httpClient
      .post(this.baseUrl + '/', { cartItemsIds })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
