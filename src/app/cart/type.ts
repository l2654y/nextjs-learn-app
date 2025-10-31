export interface ICartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  variant: string;
  count: number;
}

export type CartList = ICartItem[];
