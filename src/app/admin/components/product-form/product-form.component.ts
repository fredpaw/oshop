import { Observable } from 'rxjs/Observable';
import { Product } from '../../../shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = new Product();
  id;

  constructor(private categoryService: CategoryService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      let prodRef: Observable<any> = this.productService.get(this.id).take(1);
      prodRef.subscribe(p => this.product = p);
    }
  }

  save(product) {
    if ( this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigateByUrl('/admin/products');
  }

  delete() {
    if (!confirm('Are you sure to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigateByUrl('/admin/products');

  }

  ngOnInit() {
  }

}
