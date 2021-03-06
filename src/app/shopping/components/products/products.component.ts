import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category: string;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());

    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
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
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
    this.products.filter(p => p.category === this.category) : this.products;
  }
}
