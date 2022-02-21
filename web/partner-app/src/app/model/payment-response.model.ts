export class PaymentResponse {

  id: number;
  paymentMethodId: number;
  cardNumber: string;
  subtotal: number;
  deliveryFee: number;
  total: number;

  constructor(id: number, paymentMethodId: number, cardNumber: string, subtotal: number, deliveryFee: number, total: number) {
    this.id = id;
    this.paymentMethodId = paymentMethodId;
    this.cardNumber = cardNumber;
    this.subtotal = subtotal;
    this.deliveryFee = deliveryFee;
    this.total = total;
  }
}
