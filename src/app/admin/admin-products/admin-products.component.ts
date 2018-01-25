import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {
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

      // this.initializeTable(this.products);
    });
  }

  // private initializeTable(products: Product[]) {
  //   this.tableResource = new DataTableResource(this.products);
  //   this.tableResource.query({offset: 0})
  //     .then(items => this.items = items);
  //   this.tableResource.count()
  //     .then(count => this.itemCount = count);
  // }

  // reloadItems(params) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }

  filter(query: string) {
    this.filteredProducts = query ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
