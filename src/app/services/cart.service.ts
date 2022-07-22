import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //cart service
  private cartItems: CartItem[] = [];
  private cartItems$ = new BehaviorSubject<CartItem[]>([]);

  constructor() {}
  //get cart items
  getItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }
  //add to cart
  addToCart(product: CartItem) {
    product.product.id = this.cartItems.length ? 1 : this.cartItems.length + 1
    this.cartItems.push(product);
    this.cartItems$.next(this.cartItems);

  }

  /////////update item in cart/////
  updateCart() {}
  ////clear all items//////////
}
