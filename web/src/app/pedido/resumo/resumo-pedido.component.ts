import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-resumo-pedido',
  templateUrl: './resumo-pedido.component.html'
})
export class ResumoPedidoComponent implements OnInit {

  @Input() order: Order;

  ngOnInit() {
    console.log(this.order);
  }

}
