import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { QRCodeSVG } from "qrcode.react";
import type { Client } from "../types";
import { transactions } from "../mockData";
import { formatDate } from "../utils/formatDate";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px", userSelect: "none" },
  balanceCard: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "20px",
  },
  swipeNav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  navItem: {
    padding: "5px",
    color: "#aaa",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 20,
    textTransform: "uppercase",
  },
  activeNavItem: { color: "#007AFF", borderBottom: "2px solid #007AFF" },
  qrContainer: { textAlign: "center", padding: "20px 0" },
  transactionList: { listStyle: "none", padding: 0 },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
  },
};

type CustomerViewProps = {
  customer: Client;
};

const TransactionHistory: React.FC<{ clientId: number }> = ({ clientId }) => {
  const customerTransactions = transactions
    .filter((t) => t.clientId === clientId)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <ul style={styles.transactionList}>
        {customerTransactions.length > 0 ? (
          customerTransactions.map((tx) => (
            <li key={tx.id} style={styles.transactionItem}>
              <div>
                <div style={{ fontWeight: "500" }}>{tx.description}</div>
                <div style={{ fontSize: "14px", color: "#888" }}>
                  {formatDate(tx.date)}
                </div>
              </div>
              <div
                style={{
                  color: tx.type === "списание" ? "#E53935" : "#43A047",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                {tx.type === "списание" ? "-" : "+"}
                {tx.amount}
              </div>
            </li>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#999" }}>
            История операций пуста
          </p>
        )}
      </ul>
    </div>
  );
};

const CustomerView: React.FC<CustomerViewProps> = ({ customer }) => {
  const [activeTab, setActiveTab] = useState<"qr" | "history">("qr");

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("history"),
    onSwipedRight: () => setActiveTab("qr"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div style={styles.container}>
      <div style={styles.balanceCard}>
        <p style={{ margin: 0, opacity: 0.8 }}>Ваш баланс</p>
        <p style={{ margin: "5px 0 0", fontSize: "32px", fontWeight: "bold" }}>
          {customer.balance} бонусов
        </p>
      </div>
      <div style={styles.swipeNav}>
        <div
          style={
            activeTab === "qr"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setActiveTab("qr")}
        >
          QR-КОД
        </div>
        <div
          style={
            activeTab === "history"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setActiveTab("history")}
        >
          ИСТОРИЯ
        </div>
      </div>
      <div {...handlers} style={{ touchAction: "pan-y" }}>
        {activeTab === "qr" && (
          <div style={styles.qrContainer}>
            <QRCodeSVG
              value={JSON.stringify({ clientId: customer.id })}
              size={220}
            />
            <p style={{ color: "#888", fontSize: "14px", marginTop: "15px" }}>
              Покажите этот код кассиру
            </p>
          </div>
        )}
        {activeTab === "history" && (
          <TransactionHistory clientId={customer.id} />
        )}
      </div>
    </div>
  );
};

export default CustomerView;
