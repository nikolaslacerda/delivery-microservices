import {Component, Input, OnInit} from '@angular/core';
import {OrderRequest} from '../../../models/request/order.request.model';

@Component({
  selector: 'app-order-timeline',
  templateUrl: './order-timeline.component.html',
  styleUrls: ['./order-timeline.component.css']
})
export class OrderTimelineComponent implements OnInit {

  @Input() order: OrderRequest;

  constructor() {
  }

  ngOnInit() {
    console.log(this.order);
  }

}
