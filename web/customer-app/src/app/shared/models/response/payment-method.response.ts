export class PaymentMethodResponse {
  id: number;
  name: string;

  constructor(model: any = {}) {
    this.id = model.paymentMethod.id;
    this.name = model.paymentMethod.name;
  }
}
