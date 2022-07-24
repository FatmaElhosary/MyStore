import { Observable } from 'rxjs';
import { Product } from './../../models/Product';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { OptionService } from 'src/app/services/option.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
function spaceValidator(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
    console.log(control.value);
    return { required: true };
  } else {
    return null;
  }
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  totalPrices: number = 0;
  totalPrices$: Observable<number>;

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _options: OptionService,
    private _formBuilder: FormBuilder
  ) {
    this.cartItems$ = this._cartService.getItems();
    //this._cartService.calTotalPrice();
    this.totalPrices$ = this._cartService.getTotalPrice();
  }

  options: number[] = [];
  ngOnInit(): void {
    console.log(this.cartItems$);
    this.options = this._options.options;
    this._cartService.calTotalPrice();
  }
  updateCartItems(item: CartItem, event: any) {
    
    if(+event.target.value<=0){
      this._cartService.deleteItem(item);
    }else{
      this._options.fromCart=true;
      this._cartService.updateCart(item.id, +event.target.value);
    }
    
    alert('update quantity');
  }
  ///delete from cart
  deleteFromCart(item:CartItem) {
    this._cartService.deleteItem(item);
    alert('removed');
  }
  ///reactive form
  /**
   * The following pattern will allow a string that starts with white spaces and will not
   *  allow a string containing only white spaces:
   **/
  cartForm = this._formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
      ],
    ],
    address: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
      ],
    ],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
  });
  ///validate form

  get name() {
    return this.cartForm.get('name');
  }
  get address() {
    return this.cartForm.get('address');
  }
  get cardNumber() {
    return this.cartForm.get('cardNumber');
  }
  confirmOrder() {
    this._options.name = this.cartForm.controls['name'].value;
    this._router.navigateByUrl('/confirm');
  }
}
