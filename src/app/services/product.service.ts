import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = `${environment.baseUrl}`;
  constructor(private httpClient: HttpClient) { }

  getById(id): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/products/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + '/products/')
      .pipe(catchError(this.errorHandler));
  }

  getByPage(page: number) {
    // get page of items from api
    return this.httpClient
      .get(this.baseUrl + `/products?page=${page}`)
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
