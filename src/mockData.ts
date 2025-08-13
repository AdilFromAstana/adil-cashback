import type { Client, Business, Transaction } from "./types";

export const businesses: Business[] = [
  {
    id: 1,
    ownerLogin: "77761156416",
    ownerPassword: "123",
    cashierLogin: "cashier1",
    cashierPassword: "123",
    name: "Минимаркет 'Алишер'",
    cashbackPercentage: 5,
  },
];

export let clients: Client[] = [
  {
    id: 1,
    name: "Адиль А.",
    phone: "77761156416",
    email: "laliga2017@mail.ru",
  },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    clientId: 1,
    date: "2025-08-02T15:45:00",
    type: "начисление",
    amount: 54.0,
    purchaseAmount: 2700,
    description: "Покупка на сумму 2700.",
  },
  {
    id: 2,
    clientId: 1,
    date: "2025-08-01T11:20:00",
    type: "начисление",
    amount: 87.0,
    purchaseAmount: 4350,
    description: "Покупка на сумму 4350.",
  },
  {
    id: 3,
    clientId: 1,
    date: "2025-07-28T19:10:00",
    type: "начисление",
    purchaseAmount: 1650,
    amount: 33.0,
    description: "Покупка на сумму 1650.",
  },
  {
    id: 4,
    clientId: 1,
    date: "2025-07-27T09:01:00",
    type: "начисление",
    purchaseAmount: 2650,
    amount: 53.0,
    description: "Покупка на сумму 2650.",
  },
  {
    id: 5,
    clientId: 1,
    date: "2025-07-27T09:00:00",
    type: "начисление",
    amount: 0.0,
    description: "Регистрация",
  },
];

export const updateClientBalance = (
  clientId: number,
  newBalance: number
): boolean => {
  const clientIndex = clients.findIndex((c) => c.id === clientId);
  if (clientIndex !== -1) {
    console.log(`New balance for client ${clientId}: ${newBalance}`);
    return true;
  }
  return false;
};
