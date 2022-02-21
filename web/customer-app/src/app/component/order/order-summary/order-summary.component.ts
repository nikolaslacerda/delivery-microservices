import {Component, Input, OnInit} from '@angular/core';
import {OrderRequest} from '../../../models/order/request/order.request.model';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {

  @Input() order: OrderRequest;

  ngOnInit() {
  }

}
