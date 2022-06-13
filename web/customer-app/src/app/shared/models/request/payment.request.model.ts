export class PaymentRequest {
  paymentMethodId: number;
  name?: string;
  cardNumber?: string;
  expiration?: string;
  cvv?: string;

  constructor(model: any = {}) {
    this.paymentMethodId = model.paymentMethodId;
    this.name = model.name;
    this.cardNumber = model.cardNumber;
    this.expiration = model.expiration;
    this.cvv = model.cvv;
  }
}
