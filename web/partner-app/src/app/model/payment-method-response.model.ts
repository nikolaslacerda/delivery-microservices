export class PaymentMethodResponse {

  id?: number;
  paymentMethodId: number;
  name: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.paymentMethodId = model.paymentMethodId;
    this.name = model.name;
  }
}
