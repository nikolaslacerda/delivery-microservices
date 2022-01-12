export interface Restaurant {
  id: number;
  name: string;
  cnpj?: number;
  mainCategory: string;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  cep?: number;
  description?: string;
  address?: string;
  deliveryFee?: number;
  approved?: boolean;
  distance: number;
  userId?: number;
  imageUrl: string;
  userRating: number;
}
