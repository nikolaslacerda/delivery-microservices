export class PaymentRequest {
  paymentMethodId: string;
  cardNumber?: string;
  cardExpiration?: string;
  cardCvv?: number;
  total: number;
  subtotal: number;
  deliveryFee: number;
}
