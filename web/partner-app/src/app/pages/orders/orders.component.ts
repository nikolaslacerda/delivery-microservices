import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderService} from '../../core/services/order.service';
import {OrderResponse} from '../../shared/model/response/order-response.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: OrderResponse[] = [];
  orderClicked: any;
  isLoading = true;
  filter = 'ALL';

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    const restaurantId = this.authService.getRestaurantId();
    this.orderService.getRestaurantOrders(restaurantId)
      .subscribe((orders: OrderResponse[]) => {
        this.orders = orders;
        this.isLoading = false;
      });
  }

  getReceiveOrders(): any {
    return this.orders.filter(x => x.lastStatus === 'PAID');
  }

  getInTheKitchenOrders(): any {
    return this.orders.filter(x => x.lastStatus === 'IN_THE_KITCHEN');
  }

  getOnTheWayOrders(): any {
    return this.orders.filter(x => x.lastStatus === 'ON_THE_WAY');
  }

  getDeliveredOrders(): any {
    return this.orders.filter(x => x.lastStatus === 'DELIVERED');
  }

  orderIsClicked(order: OrderResponse): void {
    this.orderClicked = order;
  }

  isOrderClicked(order: OrderResponse): boolean {
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
