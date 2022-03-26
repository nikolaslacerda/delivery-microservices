import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  orderStatusDescription: any = {
    RECEIVED: 'Received',
    IN_THE_KITCHEN : 'In the kitchen', // confirmed
    ON_THE_WAY: 'On the way',
    DELIVERED: 'Delivered',
    CANCELED: 'Canceled'
  };

  transform(value: any): string {
    return this.orderStatusDescription[value] || value;
  }

}
