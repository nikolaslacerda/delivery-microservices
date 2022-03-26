export class AddressRequest {

  streetAddress: string;
  streetNumber: number;
  neighborhood: string;
  city: string;
  country: string;
  complement: string;
  reference: string;
  postalCode: number;

  constructor(model: any = {}) {
    this.streetAddress = model.streetAddress;
    this.streetNumber = model.streetNumber;
    this.neighborhood = model.neighborhood;
    this.city = model.city;
    this.country = model.country;
    this.complement = model.complement;
    this.reference = model.reference;
    this.postalCode = model.postalCode;
  }
}
