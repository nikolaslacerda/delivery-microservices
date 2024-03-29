export interface AddressResponse {
  id: number;
  streetName: string;
  streetNumber: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  complement?: string;
  reference?: string;
  postCode: string;
}
