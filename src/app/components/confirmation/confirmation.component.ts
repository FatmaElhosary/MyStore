import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
totalPrice$:Observable<number>;
name:string='';
  constructor(private _cartService:CartService,private _options:OptionService) {
    this.totalPrice$=this._cartService.getTotalPrice();
    this.name=this._options.name;
   }

  ngOnInit(): void {
    //this.totalPrice$=this._cartService.getTotalPrice();
  }

}
