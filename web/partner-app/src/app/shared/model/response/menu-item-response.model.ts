export interface MenuItemResponse {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  promotionalPrice: number;
  active: boolean;
  newImage?: any;
}
