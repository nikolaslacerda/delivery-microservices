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

  constructor(id: number, streetAddress: string, streetNumber: number, neighborhood: string, city: string, state: string, country: string, complement: string, reference: string, postCode: string) {
    this.id = id;
    this.streetAddress = streetAddress;
    this.streetNumber = streetNumber;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
    this.country = country;
    this.complement = complement;
    this.reference = reference;
    this.postCode = postCode;
  }
}
