import type { Client, Business, Transaction } from "./types";

export const businesses: Business[] = [
  {
    id: 1,
    ownerLogin: "asel",
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
    businessId: 1,
    name: "Адиль А.",
    phone: "77071234567",
    password: "123",
    balance: 227,
  },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    clientId: 1,
    // Добавили время для уникальности
    date: "2025-08-02T15:45:00",
    type: "начисление",
    amount: 54.00,
    description: "Покупка на сумму 5400тг.",
  },
  {
    id: 2,
    clientId: 1,
    date: "2025-08-01T11:20:00",
    type: "начисление",
    amount: 87.00,
    description: "Покупка на сумму 8700тг.",
  },
  {
    id: 3,
    clientId: 1,
    date: "2025-07-28T19:10:00",
    type: "начисление",
    amount: 33.00,
    description: "Покупка на сумму 3300тг.",
  },
  {
    id: 4,
    clientId: 1,
    // Если две транзакции в один день, время поможет их отсортировать
    date: "2025-07-27T09:01:00",
    type: "начисление",
    amount: 53.00,
    description: "Покупка на сумму 5300тг.",
  },
  {
    id: 5,
    clientId: 1,
    date: "2025-07-27T09:00:00",
    type: "начисление",
    amount: 0.00, // Например, приветственный бонус
    description: "Регистрация",
  },
];

export const updateClientBalance = (
  clientId: number,
  newBalance: number
): boolean => {
  const clientIndex = clients.findIndex((c) => c.id === clientId);
  if (clientIndex !== -1) {
    clients[clientIndex].balance = newBalance;
    console.log(`New balance for client ${clientId}: ${newBalance}`);
    return true;
  }
  return false;
};
