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
  private totalPrices:number=0;
 private totalPrices$=new BehaviorSubject<number>(0);
  constructor() {}
  //get cart items
  getItems(): Observable<CartItem[]> {
    return this.cartItems$.asObservable();
  }
  getTotalPrice():Observable<number>{
    return this.totalPrices$.asObservable();
  }
  //add to cart
  addToCart(product: CartItem) {
    ///if item is already added you should update it
    if(this.cartItems.findIndex(cart=>cart.id===product.id)!=-1){
      this.updateCart(product.id,product.quantity);
      return;
    }
    ///add new item 
    //product.id = this.cartItems.length ? 1 : this.cartItems.length + 1
    this.cartItems.push(product);
    this.cartItems$.next(this.cartItems);

  }
  /////////update item in cart/////
  updateCart(id:number,quantaty:number) {
      ///update quantaty
      //item id
    const itemIndex=this.cartItems.findIndex(cart=>cart.id===id);
    this.cartItems[itemIndex].quantity=quantaty;
    this.cartItems$.next(this.cartItems);
    console.log(this.cartItems);
    this.calTotalPrice();
    this.cartItems$.next(this.cartItems);
  }

///totalPrice
calTotalPrice(){
  //get array of prices
   let prices=this.cartItems.map((item)=>item.quantity * item.price);
   const initialValue = 0;
let total = prices.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
this.totalPrices=total;
this.totalPrices$.next(this.totalPrices)
 //return total;
}
}
