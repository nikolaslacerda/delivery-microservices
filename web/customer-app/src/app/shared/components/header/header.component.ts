import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {RestaurantService} from '../../../core/services/restaurant.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ShoppingCartService} from '../../../core/services/shopping-cart.service';
import * as Feather from 'feather-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  // title = 'Delivery Microservices';
  // isNavbarCollapsed = true;
  // user: any;

  searchForm = this.fb.group({
    restaurantName: ['', Validators.required]
  });

  cartCount: any;
  constructor(private router: Router,
              private tst: AuthenticationService,
              private authenticationService: AuthenticationService,
              private restaurantService: RestaurantService,
              private shoppingCartService: ShoppingCartService,
              private fb: FormBuilder
  ) {
    this.shoppingCartService.itemsO.subscribe(items => {
      this.cartCount = items.map(item => item.quantity).reduce((x, y) => x + y, 0);
    });
  }

  ngAfterViewInit() {
    Feather.replace();
  }

  ngOnInit() {

    // this.authenticationService.currentUser.subscribe(user => {
    //   this.user = user;
    //   if (user && user.role && user.role.includes('PARTNER')) {
    //     this.restauranteService.getUserRestaurants(user)
    //       .subscribe(restaurant => user.restaurantId = restaurant.id);
    //   }
    // });
  }

  logout() {
    // this.authenticationService.logout();
    // this.router.navigate(['']);
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.router.navigate(['/restaurants'], {queryParams: {q: this.searchForm.value.restaurantName}});
    } else {
      this.router.navigate(['/restaurants']);
    }
  }

}
