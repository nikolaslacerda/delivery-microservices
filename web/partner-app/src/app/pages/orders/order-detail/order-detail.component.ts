import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {OrderResponse} from '../../../model/order-response.model';
import {MenuService} from '../../../services/menu.service';
import {MenuItemResponse} from '../../../model/menu-item-response.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnChanges {

  @Input() order: OrderResponse = {} as OrderResponse;
  isLoading = true;

  constructor(private orderService: OrderService,
              private menuService: MenuService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
    this.order.items.forEach(item => {
      this.menuService.getMenuItemById(item.menuItemId)
        .subscribe((menuItem: MenuItemResponse) => {
          item.name = menuItem.name;
          item.price = menuItem.unitPrice;
          this.isLoading = false;
        });
    });
  }

  ngOnInit(): void {
  }

  confirmOrder(order: OrderResponse): void {
    const status = 'IN_THE_KITCHEN';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.status = status);
  }

  deliveryOrder(order: OrderResponse): void {
    const status = 'ON_THE_WAY';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.status = status);
  }

  cancelOrder(order: OrderResponse): void {
    const status = 'CANCELED';
    this.orderService.updateStatus(order.id, status)
      .subscribe(() => order.status = status);
  }

}
