import { Observable } from 'rxjs';
import { Product } from './../../models/Product';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   cartItems$: Observable<CartItem[]>;
  constructor(private _cartService:CartService) {
    this.cartItems$=this._cartService.getItems();
   }


  ngOnInit(): void {
console.log(this.cartItems$)
  }

}
