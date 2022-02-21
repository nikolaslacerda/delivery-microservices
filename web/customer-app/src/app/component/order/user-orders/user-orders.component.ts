import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  customer: any;
  customerOrders: Array<any> = [];
  items: Array<any>;

  constructor(private authService: AuthenticationService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.customer = this.authService.getCurrentUser;

    this.orderService.getCustomerOrders(this.customer.id)
      .subscribe(orders => this.customerOrders = orders)
    ;
  }

}
