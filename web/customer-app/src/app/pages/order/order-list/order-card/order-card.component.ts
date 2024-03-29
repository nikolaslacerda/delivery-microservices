import {Component, Input, OnInit} from '@angular/core';
import {MenuService} from '../../../../core/services/menu.service';
import {Router} from '@angular/router';
import {OrderResponse} from '../../../../shared/models/response/order.response.model';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input() order: OrderResponse;
  showAllItems = false;

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  expandItems(): void {
    this.showAllItems = !this.showAllItems;
  }

  navigateToStatus() {
    this.route.navigate([`/orders/${this.order.id}/status`]);
  }
}
