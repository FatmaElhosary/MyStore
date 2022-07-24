import { Product } from './../../models/Product';
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/services/cart.service';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
@Input() product:Product;
@Output() addProduct=new EventEmitter();
//@Output() addQuantities= new EventEmitter();

quantity:number=1;
cartItem:CartItem;
options:number[]=[];
  constructor(private _cartService:CartService,private _optionsService:OptionService) {
    this.product={
      id:0,
      name:'',
      price:0,
      url:'',
      description:''
    };
    this.cartItem={
      id:0,
      name:'',
      price:0,
      url:'',
      description:'',
      quantity:1
    }
  }

  ngOnInit(): void {
 this.options=this._optionsService.options;
  }
  ///prepare cartitem
  loadCartItem(){
  console.log(this.quantity);
  this.cartItem= {...this.product,quantity:this.quantity};

  }
  //add to cart service
  addItemtoCart(cartItem:CartItem){
    this._cartService.addToCart(cartItem);
    alert('added');

  }

}
