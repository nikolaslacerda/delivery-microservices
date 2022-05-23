export class CustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  password: string;

  constructor(model: any = {}) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.cpf = model.cpf;
    this.password = model.password;
  }
}
