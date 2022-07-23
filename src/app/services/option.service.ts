import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  //share products quantity array between all components
  options:number[]=[1,2,3,4,5];
  name:string='';
  constructor() { }
}
