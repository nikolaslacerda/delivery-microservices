export class PaymentMethodResponse {

  id: number;
  name: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.name = model.name;
  }
}
