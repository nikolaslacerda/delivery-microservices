export class PaymentResponse {

  id: number;
  paymentMethodId: number;
  cardNumber: string;
  subtotal: number;
  deliveryFee: number;
  total: number;

  constructor(model: any = {}) {
    this.id = model.id;
    this.paymentMethodId = model.paymentMethodId;
    this.cardNumber = model.cardNumber;
    this.subtotal = model.subtotal;
    this.deliveryFee = model.deliveryFee;
    this.total = model.total;
  }
}
