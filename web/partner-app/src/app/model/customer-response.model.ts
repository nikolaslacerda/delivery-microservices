export class CustomerResponse {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.phone = model.phone;
  }
}
