import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  orderStatusDescription: any = {
    PAID: 'Waiting Confirmation',
    IN_THE_KITCHEN : 'In the kitchen',
    ON_THE_WAY: 'On the way',
    DELIVERED: 'Delivered'
  };

  transform(value: any): string {
    return this.orderStatusDescription[value] || value;
  }

}
