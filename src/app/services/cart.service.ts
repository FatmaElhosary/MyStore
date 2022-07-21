import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //cart service
  private cartItems: Product[] = [];
  private cartItems$ = new BehaviorSubject<Product[]>([]);

  constructor() {}
  //get cart items
  getItems(): Observable<Product[]> {
    return this.cartItems$.asObservable();
  }
  //add to cart
  addToCart(product: Product) {
    product.id = this.cartItems.length ? 1 : this.cartItems.length + 1
    this.cartItems.push(product);
    this.cartItems$.next(this.cartItems)

  }

  /////////update item in cart/////
  updateCart() {}
  ////clear all items//////////
}
