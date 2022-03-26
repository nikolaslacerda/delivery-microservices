import {Component, Input, OnInit} from '@angular/core';
import {OrderRequest} from '../../../shared/models/request/order.request.model';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
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
