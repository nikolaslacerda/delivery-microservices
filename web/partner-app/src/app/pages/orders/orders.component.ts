import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../services/order.service';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Array<any> = [];
  orderClicked: any;
  isLoading = true;
  filter = 'ALL';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    const restaurantId = 1;
    this.orderService.getRestaurantOrders(1)
      .subscribe(orders => {
        this.delay(1000).then(() => {
          this.orders = orders;
          console.log(this.orders);
          this.isLoading = false;
        });
      });
  }

  getReceiveOrders(): any {
    return this.orders.filter(x => x.status === 'RECEIVED');
  }

  getInTheKitchenOrders(): any {
    return this.orders.filter(x => x.status === 'IN_THE_KITCHEN');
  }

  getOnTheWayOrders(): any {
    return this.orders.filter(x => x.status === 'ON_THE_WAY');
  }

  getDeliveredOrders(): any {
    return this.orders.filter(x => x.status === 'DELIVERED');
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  orderIsClicked(order: any): any {
    this.orderClicked = order;
  }

  isOrderClicked(order: any): any {
    if (this.orderClicked) {
      return this.orderClicked.id === order.id;
    }
    return false;
  }

  onChange(event: Event): any {
    // @ts-ignore
    this.filter = event.target.value;
  }
}
