import {Component, Input, OnInit} from '@angular/core';
import {OrderResponse} from '../../../shared/models/response/order.response.model';

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
  }

}
