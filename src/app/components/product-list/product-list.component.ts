import { CartService } from './../../services/cart.service';
import { Observable } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private _productSer: ProductService,private _cartService:CartService) {
    this._productSer.loadProducts();
    this.products$ = this._productSer.getProducts();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this._productSer.unsubscribe();
  }

  ///user click add product to cart in child component
  addProduct() {
    console.log('added product to cart');
   
  }
}
