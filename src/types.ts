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
  cashbackPercent: number;
  address: string | null;
  isActive: boolean;
  city: string;
  latitude: string | null;
  longitude: string | null;
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
  type: "credit" | "debit";
  description: string;
  purchaseAmount: string | null;
  cashbackPercent: string | null;
  cashbackAmount: string;
  createdAt: string;
}

export type Wallet = {
  id: number;
  user: {
    id: number;
    name: string | null;
    email: string;
  };
  shop: {
    id: number;
    name: string;
    cashbackPercent: number;
    imageUrl: string | null;
  };
  balance: string; // "0.00"
};

export type AuthenticatedUser =
  | { type: "owner"; data: Business }
  | { type: "cashier"; data: Business }
  | { type: "customer"; data: Client };
