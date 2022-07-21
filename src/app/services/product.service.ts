import { Product } from './../models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  private products$ = new BehaviorSubject<Product[]>([]);
  constructor(private _httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }
  //get all product from json data file
  loadProducts() {
    this._httpClient.get<Product[]>('/assets/data.json').subscribe((products) => {
      this.products = products;
      this.products$.next(this.products);
    });
  }

  
}
