import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../../core/services/menu.service';
import {ActivatedRoute} from '@angular/router';
import {MenuResponse} from '../../../../shared/models/response/menu.response.model';
import {ShoppingCartService} from '../../../../core/services/shopping-cart.service';
import {MenuItemResponse} from '../../../../shared/models/response/menu-item.response';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoading = true;
  menu: MenuResponse = {} as MenuResponse;

  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.menuService.getByRestaurant(restaurantId)
      .subscribe(menu => {
        this.menu = menu;
        this.isLoading = false;
      });
  }

  addItem(item: MenuItemResponse): void {
    this.shoppingCartService.handleAddItem(item);
  }
}
