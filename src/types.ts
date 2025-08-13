export interface Business {
  id: number;
  ownerLogin: string;
  ownerPassword: string;
  cashierLogin: string;
  cashierPassword: string;
  name: string;
  cashbackPercentage: number;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Transaction {
  id: number;
  clientId: number;
  date: string;
  type: "начисление" | "списание";
  amount: number;
  purchaseAmount?: number;
  description: string;
}

export interface Wallet {
  id: string;
  shopId: string;
  balance: string;
  shop: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
}

export type AuthenticatedUser =
  | { type: "owner"; data: Business }
  | { type: "cashier"; data: Business }
  | { type: "customer"; data: Client };
