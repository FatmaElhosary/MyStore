import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
 product:Product;
 productId:number=0;
  constructor(private _router:ActivatedRoute,private _productService:ProductService) { 
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
 
  }
getProduct(){
 return this._productService.getSingleProduct(this.productId);
}

}
