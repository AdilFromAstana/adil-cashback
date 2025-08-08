// src/pages/ClientsPage.tsx

import React, { useState } from "react";
import { clients, transactions } from "../mockData";
import type { Client } from "../types";
import { formatDate } from "../utils/formatDate";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  clientCard: {
    backgroundColor: "#fff",
    padding: "15px 20px",
    borderRadius: "12px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "transform 0.2s",
  },
  clientName: { fontWeight: "bold", fontSize: "18px" },
  clientBalance: { color: "#007AFF", fontWeight: "bold", fontSize: "18px" },

  // Стили для детальной страницы
  detailHeader: { marginBottom: "20px" },
  backButton: {
    background: "transparent",
    border: "none",
    color: "#007AFF",
    fontSize: "16px",
    cursor: "pointer",
    padding: "0 0 15px 0",
  },
  statCard: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    flex: 1,
  },
  statValue: { fontSize: "20px", fontWeight: "bold", margin: 0 },
  statLabel: { fontSize: "14px", color: "#666", margin: "5px 0 0" },
  transactionList: { listStyle: "none", padding: 0, marginTop: "30px" },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
  },
};

const ClientDetailView: React.FC<{ client: Client; onBack: () => void }> = ({
  client,
  onBack,
}) => {
  const clientTransactions = transactions
    .filter((t) => t.clientId === client.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const lastVisit =
    clientTransactions.length > 0
      ? formatDate(clientTransactions[0].date)
      : "Нет данных";

  const purchaseTransactions = clientTransactions.filter(
    (t) => t.type === "начисление" && t.purchaseAmount
  );

  const totalPurchaseAmount = purchaseTransactions.reduce(
    (sum, tx) => sum + (tx.purchaseAmount || 0),
    0
  );

  const averageCheck =
    purchaseTransactions.length > 0
      ? totalPurchaseAmount / purchaseTransactions.length
      : 0;

  const totalBonusesAccrued = clientTransactions
    .filter((t) => t.type === "начисление")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div>
      <button onClick={onBack} style={styles.backButton}>
        ← Назад к списку
      </button>
      <div style={styles.detailHeader}>
        <h2 style={{ margin: 0 }}>{client.name}</h2>
        <p style={{ margin: "5px 0 0", color: "#666", fontSize: "16px" }}>
          +{client.phone}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <div style={styles.statCard}>
          <p style={styles.statValue}>
            {totalPurchaseAmount.toLocaleString("ru")} тг
          </p>
          <p style={styles.statLabel}>Общая сумма покупок</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statValue}>
            {averageCheck.toLocaleString("ru", { maximumFractionDigits: 0 })} тг
          </p>
          <p style={styles.statLabel}>Средний чек</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statValue}>{client.balance}</p>
          <p style={styles.statLabel}>Текущий баланс</p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statValue}>{totalBonusesAccrued}</p>
          <p style={styles.statLabel}>Всего бонусов начислено</p>
        </div>
      </div>

      <h3>История операций</h3>
      <p>
        <strong>Последний визит:</strong> {lastVisit}
      </p>
      <ul style={styles.transactionList}>
        {clientTransactions.map((tx) => (
          <li key={tx.id} style={styles.transactionItem}>
            <div>
              <div style={{ fontWeight: "500" }}>{tx.description}</div>
              <div style={{ fontSize: "14px", color: "#888" }}>
                {tx.purchaseAmount ? `Чек: ${tx.purchaseAmount} тг` : ""}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  color: tx.type === "списание" ? "#E53935" : "#43A047",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {tx.type === "списание" ? "-" : "+"}
                {tx.amount} бонусов
              </div>
              <div style={{ fontSize: "14px", color: "#888" }}>
                {formatDate(tx.date)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Основной компонент страницы ---
const ClientsPage = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  if (selectedClient) {
    return (
      <div style={styles.container}>
        <ClientDetailView
          client={selectedClient}
          onBack={() => setSelectedClient(null)}
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h3>База клиентов</h3>
      <div>
        {clients.map((client) => (
          <div
            key={client.id}
            style={styles.clientCard}
            onClick={() => setSelectedClient(client)}
          >
            <div>
              <div style={styles.clientName}>{client.name}</div>
              <div style={{ fontSize: "14px", color: "#666" }}>
                +{client.phone}
              </div>
            </div>
            <div style={styles.clientBalance}>{client.balance} бонусов</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsPage;
