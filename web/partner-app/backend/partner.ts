export class Partner {
  constructor(public id: number, public email: string, public password: string) {
  }

  matches(partner: Partner): boolean {
    return partner !== undefined && partner.email === this.email && partner.password === this.password;
  }
}

export const partners: { [key: string]: Partner } = {
  'nikolas@email.com': new Partner(1, 'nikolas@email.com', '1234'),
  'john@email.com': new Partner(2, 'john@email.com', '1234')
};
