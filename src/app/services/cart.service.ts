import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = `${environment.baseUrl}/cart`;
  private cart = new BehaviorSubject<any>([]);
  currentCart$ = this.cart.asObservable();


  constructor(private httpClient: HttpClient) {

  }

  getItems() {
    return this.httpClient.get(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  addToCart(product: Product) {

    let cartItem
    const cartValue = this.cart.getValue()
    const existingItem = cartValue.find(item => item.product._id === product._id);
    if (existingItem) {
      existingItem.quantity++;
      cartItem = existingItem
    } else {
      cartItem = { product, quantity: 1 }
      cartValue.push(cartItem);
      this.cart.next(cartValue)
    }
    return this.updateCartItem(cartItem)
  }

  updateCartItem(cartItem) {
    return this.httpClient.post(this.baseUrl, { cartItem })
      .pipe(catchError(this.errorHandler));
  };

  deleteCartItem(cartItem) {
    return this.httpClient.delete(this.baseUrl, { params: { id: cartItem._id } })
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error) {
    let errorMessage = '';
    console.log(error);

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