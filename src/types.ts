export interface Business {
  id: number;
  ownerLogin: string;
  ownerPassword: string;
  cashierLogin: string;
  cashierPassword: string;
  name: string;
  cashbackPercentage: number;
}

export interface Client {
  id: number;
  businessId: number; // В реальном приложении это будет таблица связей
  name: string;
  phone: string;
  password: string; // Добавили пароль
  balance: number;
}

export interface Transaction {
  id: number;
  clientId: number;
  date: string;
  type: "начисление" | "списание";
  amount: number;
  description: string;
}

export type AuthenticatedUser =
  | { type: "owner"; data: Business }
  | { type: "cashier"; data: Business }
  | { type: "customer"; data: Client };
