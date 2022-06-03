import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from '../../../core/services/order.service';
import {OrderResponse} from '../../../shared/model/response/order-response.model';
import {MenuService} from '../../../core/services/menu.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {

  @Input() order: OrderResponse = {} as OrderResponse;
  isLoading = false;

  constructor(private orderService: OrderService,
              private menuService: MenuService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  confirmOrder(order: OrderResponse): void {
    const status = 'IN_THE_KITCHEN';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.lastStatus = status);
  }

  deliveryOrder(order: OrderResponse): void {
    const status = 'ON_THE_WAY';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.lastStatus = status);
  }

  cancelOrder(order: OrderResponse): void {
    const status = 'CANCELED';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.lastStatus = status);
  }

}
