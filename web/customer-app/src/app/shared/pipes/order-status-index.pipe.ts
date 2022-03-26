import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderStatusIndex'
})
export class OrderStatusIndexPipe implements PipeTransform {

  orderStatusIndex: any = {
    RECEIVED: 1,
    IN_THE_KITCHEN : 2,
    ON_THE_WAY: 3,
    DELIVERED: 4,
    CANCELED: 5
  };

  transform(value: any): number {
    return this.orderStatusIndex[value] || value;
  }

}
