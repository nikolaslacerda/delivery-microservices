import {Client} from './client';

export class Delivery {
  id: number;
  cep: string;
  address: string;
  complement: string;
  client: Client;
}
