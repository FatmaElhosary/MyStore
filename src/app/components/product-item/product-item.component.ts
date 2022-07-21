import { Product } from './../../models/Product';
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
@Input() product:Product;
@Output() addProduct=new EventEmitter();
  constructor() {
    this.product={
      id:0,
      name:'',
      price:0,
      url:'',
      description:''
    }
  }

  ngOnInit(): void {
  }
 
}
