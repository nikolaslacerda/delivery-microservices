import {AddressRequest} from './address.request.model';

export class DeliveryRequest {
  address: AddressRequest;

  constructor(model: any = {}) {
    this.address = model.address;
  }
}
