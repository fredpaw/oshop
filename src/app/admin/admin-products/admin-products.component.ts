import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private productService: ProductService) {
    
  }

  filter(query: string) {
    this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.subscription = this.productService.getAll().subscribe(products => {
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
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
