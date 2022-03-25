export class CustomerResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
  role: string;

  constructor(model: any = {}) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.phone = model.phone;
    this.cpf = model.cpf;
    this.role = model.role;
  }
}
