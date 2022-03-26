import {Component, Input, OnInit} from '@angular/core';
import {OrderResponse} from '../../../shared/models/response/order.response.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  @Input() order: OrderResponse;

  ngOnInit() {
  }

}
