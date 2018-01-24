import { Observable } from 'rxjs/Observable';
import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<AppUser>;

  constructor(private auth: AuthService) {
    this.user$ = auth.appUser$;
  }

  logout() {
    this.auth.logout();
  }

}
