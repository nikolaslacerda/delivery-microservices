import {Component, OnInit} from '@angular/core';
import {CardapioService} from '../../../services/cardapio.service';
import {ActivatedRoute} from '@angular/router';
import {Menu} from '../../../models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: []
})
export class MenuComponent implements OnInit {

  menu: Menu = {} as Menu;

  constructor(private menuService: CardapioService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const restaurantId = this.route.parent.snapshot.params.restaurantId;
    this.menuService
      .getByRestaurant(restaurantId)
      .subscribe(menu => {
        console.log(menu);
        this.menu = menu[0];
        console.log(this.menu);
        this.menuService.getMenuCategories(this.menu.id).subscribe(categories => {
          console.log('CATEGORIES', categories);
          for (const category of categories) {
            this.menuService.getCategoryItems(category.id).subscribe(items => {
              console.log('ITEMS', items);
              category.items = items;
            });
          }
          this.menu.categories = categories;
          console.log(this.menu);
        });
      });
  }

}
