import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-delivery-costs',
  templateUrl: './order-delivery-costs.component.html',
  styleUrls: []
})
export class OrderDeliveryCostsComponent implements OnInit {

  @Input() deliveryFee: number;
  @Input() subtotal: number;
  @Input() total: number;

  constructor() {
  }

  ngOnInit() {
  }

}
