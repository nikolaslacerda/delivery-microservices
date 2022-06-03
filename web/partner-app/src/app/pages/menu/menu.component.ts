import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../core/services/menu.service';
import {MenuResponse} from '../../shared/model/response/menu-response.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoading = true;
  menu = {} as MenuResponse;

  constructor(private menuService: MenuService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const restaurantId = this.authService.getRestaurantId();
    this.menuService.getMenuByRestaurant(restaurantId)
      .subscribe((menu: MenuResponse) => {
        this.isLoading = false;
        this.menu = menu;
      });
  }
}
