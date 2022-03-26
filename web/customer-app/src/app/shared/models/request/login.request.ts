export class LoginRequest {

  email: number;
  password: number;

  constructor(model: any = {}) {
    this.email = model.email;
    this.password = model.password;
  }
}
