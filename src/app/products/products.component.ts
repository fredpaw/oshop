import { ShoppingCartService } from './../shopping-cart.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy, OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: any;
  category: string;
  pSubscription: Subscription;
  cSubscription: Subscription;

  constructor(route: ActivatedRoute, productService: ProductService, private shoppingCartService: ShoppingCartService) {
    this.pSubscription = productService.getAll()
      .switchMap(products => {
        for ( let i = 0; i < products.length; i++ ) {
          this.products[i] = {
            title: products[i].payload.val().title,
            price: products[i].payload.val().price,
            category: products[i].payload.val().category,
            imageUrl: products[i].payload.val().imageUrl,
            key: products[i].key,
          };
        }
        this.filteredProducts = this.products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = this.category ?
          this.products.filter(p => p.category === this.category) : this.products;
      });

    
  }

  async ngOnInit() {
    this.cSubscription = (await this.shoppingCartService.getCart()).subscribe( cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.pSubscription.unsubscribe();
    this.cSubscription.unsubscribe();
  }
}
