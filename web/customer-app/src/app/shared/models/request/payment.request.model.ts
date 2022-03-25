export class PaymentRequest {

  paymentMethodId: number;
  cardNumber?: string;

  constructor(model: any = {}) {
    this.paymentMethodId = model.paymentMethodId;
    this.cardNumber = model.cardNumber;
  }
}
