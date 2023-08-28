import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from "../models/product";
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { MatStepper } from '@angular/material/stepper';

export interface CartItem {
  product: Product;
  quantity: number;
  _id: string
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  totalPrice: number;
  kashierHppUrl: string;
  order: any


  constructor(private cartService: CartService, private orderService: OrderService,) { }
  @ViewChild('stepper') stepper!: MatStepper;
  ngOnInit(): void {
    this.cartService.currentCart$.subscribe((value) => {
      this.cart = value;
    });
    this.getCartData()

  }

  nextStep() {
    this.stepper.next();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((acc, e) => { return acc + e.product.price * e.quantity }, 0)

  }

  getCartData() {
    this.cartService.getItems().subscribe((data: any) => {
      this.cart = data.cartItems;
      this.calculateTotalPrice()
    });
  }


  updateCartItem(item, i: number) {
    console.log(item);

    this.cartService.updateCartItem(item).subscribe((data) => {
      this.calculateTotalPrice()
      console.log(this.totalPrice, "data saved successfully")
    })
  }

  removeFromCart(cartItem: CartItem) {
    const index = this.cart.findIndex(item => item.product._id === cartItem.product._id);

    if (index !== -1) {
      this.cart.splice(index, 1);

    }
  }

  placeOrder() {
    const cartItemsIds = this.cart.map((e) => e._id)
    this.orderService.placeOrder(cartItemsIds).subscribe(
      (data: any) => {
        this.order = data.order;
        this.kashierHppUrl = this.kashierHppUrl = data.hppUrl;

        this.nextStep();
      },
      (error) => {
        alert('Something went wrong');
      }
    );
  }

}
