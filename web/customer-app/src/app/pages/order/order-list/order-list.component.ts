import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication.service';
import {OrderService} from '../../../core/services/order.service';
import {OrderResponse} from '../../../shared/models/response/order.response.model';
import {OrderStatusIndexPipe} from '../../../shared/pipes/order-status-index.pipe';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  customerOrders: OrderResponse[] = [];

  constructor(private orderService: OrderService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.orderService.getCustomerOrders(this.authService.getCurrentUser.id)
      .subscribe((orders: OrderResponse[]) => {
        this.customerOrders = orders;
      });
  }

  getProcessOrders(): OrderResponse[] {
    return this.customerOrders.filter((order: OrderResponse) => (new OrderStatusIndexPipe().transform(order.lastStatus)) !== 4);
  }

  getHistoric(): OrderResponse[] {
    return this.customerOrders.filter((order: OrderResponse) => (new OrderStatusIndexPipe().transform(order.lastStatus)) === 4);
  }

}
