export interface AddressRequest {
  streetAddress: string;
  complement: string;
  postalCode: AddressRequest;
}
