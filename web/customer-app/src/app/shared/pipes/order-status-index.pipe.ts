import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderStatusIndex'
})
export class OrderStatusIndexPipe implements PipeTransform {

  orderStatusIndex: any = {
    RECEIVED: 1,
    PAID: 2,
    IN_THE_KITCHEN : 3,
    ON_THE_WAY: 4,
    DELIVERED: 5,
    CANCELED: 6
  };

  transform(value: any): number {
    return this.orderStatusIndex[value] || value;
  }

}
