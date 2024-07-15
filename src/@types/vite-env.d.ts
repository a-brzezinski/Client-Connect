/// <reference types="vite/client" />

export interface PurchaseHistory {
  item: string;
  price: string;
  purchaseDate: string;
  itemId: string;
}
export interface Customer {
  avatar: string;
  phone: string;
  name: string;
  email: string;
  purchaseHistory: PurchaseHistory[];
  id: string;
}
