import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../../../services/menu.service';
import {Router} from '@angular/router';
import {OrderResponse} from '../../../../models/response/order.response.model';

@Component({
  selector: 'app-user-order-card',
  templateUrl: './user-order-card.component.html',
  styleUrls: ['./user-order-card.component.css']
})
export class UserOrderCardComponent implements OnInit {

  @Input() order: OrderResponse;

  showAllItems = false;

  constructor(private menuService: MenuService, private route: Router) {
  }

  ngOnInit() {
    for (const orderItem of this.order.items) {
      this.menuService.getItemById(orderItem.menuItemId).subscribe(item => {
        orderItem.name = item.name;
      });
    }
  }

  expandItems() {
    this.showAllItems = !this.showAllItems;
  }

  navigateToStatus() {
    this.route.navigate([`/orders/${this.order.id}/status`])
  }
}
