import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'OrderStatusIndex'
})
export class OrderStatusIndexPipe implements PipeTransform {

  orderStatusDescription: any = {
    RECEIVED: 1,
    IN_THE_KITCHEN : 2,
    ON_THE_WAY: 3,
    DELIVERED: 4
  };

  transform(value: any): string {
    return this.orderStatusDescription[value] || value;
  }

}
