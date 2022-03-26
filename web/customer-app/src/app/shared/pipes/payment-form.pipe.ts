import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'PaymentForm'
})
export class PaymentFormPipe implements PipeTransform {

  paymentForms: any = {
    CREDIT_CARD: 'Credit Card',
    DEBIT_CARD: 'Debit Card',
    CASH: 'Cash'
  };

  transform(value: any): string {
    return this.paymentForms[value] || value;
  }

}
