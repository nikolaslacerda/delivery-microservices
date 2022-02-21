import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'PaymentMethod'
})
export class PaymentMethodPipe implements PipeTransform {

  paymentMethodDescription: any = {
    CREDIT_CARD: 'Credit Card',
    MEAL_TICKET: 'Meal Ticket',
    DEBIT_CARD: 'Debit Card',
    MOBILE_WALLET: 'Mobile Wallet',
    CASH: 'Cash'
  };

  transform(value: any): string {
    return this.paymentMethodDescription[value] || value;
  }

}
