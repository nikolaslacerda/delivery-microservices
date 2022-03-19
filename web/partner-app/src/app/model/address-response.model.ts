export class AddressResponse {

  id: number;
  streetAddress: string;
  streetNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement?: string;
  reference?: string;
  postCode: string;

  constructor(model: any = {}) {
    this.id = model.id;
    this.streetAddress = model.streetAddress;
    this.streetNumber = model.streetNumber;
    this.neighborhood = model.neighborhood;
    this.city = model.city;
    this.state = model.state;
    this.country = model.country;
    this.complement = model.complement;
    this.reference = model.reference;
    this.postCode = model.postCode;
  }
}
