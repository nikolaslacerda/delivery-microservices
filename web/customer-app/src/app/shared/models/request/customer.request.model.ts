export class CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;

  constructor(model: any = {}) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.phone = model.phone;
    this.password = model.password;
  }
}
