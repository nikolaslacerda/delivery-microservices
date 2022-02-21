import {Component, OnInit} from '@angular/core';
import {MenuService} from '../../../../../services/menu.service';
import {ActivatedRoute} from '@angular/router';
import {Menu} from '../../../../../models/restaurant/menu';
import {ShoppingCartService} from '../../../../../services/shopping-cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {

  menu: Menu = {} as Menu;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.menuService
      .getByRestaurant(restaurantId)
      .subscribe(menu => {
        this.menu = menu[0];
        this.menuService.getCategories(this.menu.id).subscribe(categories => {
          for (const category of categories) {
            this.menuService.getItems(category.id).subscribe(items => {
              category.items = items;
            });
          }
          this.menu.categories = categories;
        });
      });
  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }
}
