import {Component, Input, OnInit} from '@angular/core';
import {OrderRequest} from '../../../models/request/order.request.model';
import {OrderResponse} from '../../../models/response/order.response.model';

@Component({
  selector: 'app-order-timeline',
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.css']
})
export class OrderTimelineComponent implements OnInit {

  @Input() order: OrderResponse;

  constructor() {
  }

  ngOnInit() {
    console.log(this.order);
  }

}
