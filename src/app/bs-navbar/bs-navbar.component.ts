import { ShoppingCartService } from './../shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  user$: Observable<AppUser>;
  ShoppingCartItemCount: number;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    
  }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.user$ = this.auth.appUser$;
    let cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    cart$.subscribe(cart => {
      this.ShoppingCartItemCount = 0;
      for (let productId in cart.items) {
        this.ShoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

}
