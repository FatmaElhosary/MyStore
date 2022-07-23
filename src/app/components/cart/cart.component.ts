import { Observable } from 'rxjs';
import { Product } from './../../models/Product';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { OptionService } from 'src/app/services/option.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   cartItems$: Observable<CartItem[]>;
   totalPrices:number=0;
   totalPrices$ :Observable<number>;

  constructor(private _cartService:CartService,private _options:OptionService,private _formBuilder:FormBuilder) {
    this.cartItems$=this._cartService.getItems();
    //this._cartService.calTotalPrice();
    this.totalPrices$=this._cartService.getTotalPrice();
   }
   
  options:number[]=[];
  ngOnInit(): void {
  console.log(this.cartItems$);
  this.options=this._options.options;
  this._cartService.calTotalPrice();
  }
  updateCartItems(item:CartItem){
   this._cartService.updateCart(item.id,item.quantity);
   
  }
///reactive form
  cartForm =this._formBuilder.group(
    {
    name:['',[Validators.required]
  ],
  address:['',[Validators.required]],
  cardNumber:['',[Validators.required]]}
   );
  ///validate form
  getNameErrorMessage() {
    let errMse = '';
    if (this.name?.hasError('required')) {
      errMse = 'You must enter a name';
    }
    if (this.name?.hasError('pattern')) {
      errMse = 'you must enter English char and no special characters allowed';
    }
    if (this.name?.hasError('forbiddenNameValidator')) {
      errMse = 'you must enter English char';
    }
    return errMse;
  }
  get name() {
    return this.cartForm.get('name');
  }
  get address() {
    return this.cartForm.get('address');
  }
  get cardNumber() {
    return this.cartForm.get('cardNumber');
  }
  confirmOrder(){

  }
}
