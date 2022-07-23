import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { OptionService } from 'src/app/services/option.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
 product:Product;
 productId:number=0;
 options:number[]=[];
 quantity:number=1;
  constructor(private _router:ActivatedRoute,
    private _productService:ProductService,
    private _cartService:CartService,
    private _options:OptionService) { 
    this.product={
      id:0,
      name:'',
      price:0,
      url:'',
      description:''
    }
  }

  ngOnInit(): void {
  this.productId=Number(this._router.snapshot.paramMap.get('id'));
   this._productService.loadProducts();

  this.product=this.getProduct()??this.product;
  this.options=this._options.options;
 
  }
getProduct(){
 return this._productService.getSingleProduct(this.productId);
}
///////change quantity///////////////////////
changeQuantity(value:any){
console.log(value);
console.log(this.quantity);
//this.quantity=value;

}
addToCart(product:Product){
let cartItem:CartItem={...product,quantity:this.quantity}
this._cartService.addToCart(cartItem);
alert('added');
}
}
