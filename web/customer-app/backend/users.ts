export class User {
  constructor(public id: string, public email: string, public name: string, public password: string, public role: string) {
  }

  matches(user: User): boolean {
    return user !== undefined && user.email === this.email && user.password === this.password;
  }
}

export const users: { [key: string]: User } = {
  'nikolas@email.com': new User('1', 'nikolas@email.com', 'Nikolas', '1234', 'PARTNER'),
  'john@email.com': new User('2', 'john@email.com', 'John', '1234', 'PARTNER')
};

export const partners: { [key: string]: User } = {
  'nikolas@email.com': new User('1', 'nikolas@email.com', 'Nikolas', '1234', 'PARTNER'),
  'john@email.com': new User('2', 'john@email.com', 'John', '1234', 'PARTNER')
};
