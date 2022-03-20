import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {OrderService} from '../../../services/order.service';
import {OrderResponse} from '../../../models/response/order.response.model';
import {OrderStatusIndexPipe} from '../../../shared/pipes/order-status-index.pipe';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  customerOrders: Array<OrderResponse> = [];

  constructor(private orderService: OrderService,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.orderService.getCustomerOrders(this.authService.getCurrentUser.id)
      .subscribe((orders: OrderResponse[]) => {
        console.log(orders);
        this.customerOrders = orders;
      })
    ;
  }

  getProcessOrders() {
    return this.customerOrders.filter((order: OrderResponse) => (new OrderStatusIndexPipe().transform(order.status)) !== 4);
  }

  getHistoric() {
    return this.customerOrders.filter((order: OrderResponse) => (new OrderStatusIndexPipe().transform(order.status)) === 4);
  }

}
