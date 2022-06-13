export interface PaymentResponse {
  id: number;
  paymentMethodId: number;
  cardNumber: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
}
