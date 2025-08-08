import React from "react";
import { QRCodeSVG } from "qrcode.react";
import type { Client } from "../types";

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
  qrContainer: { textAlign: "center", padding: "20px" },
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

const CustomerView: React.FC<CustomerViewProps> = ({ customer }) => {
  return (
    <div style={styles.container}>
      <div style={styles.balanceCard}>
        <p style={{ margin: 0, opacity: 0.8 }}>Ваш баланс</p>
        <p style={{ margin: "5px 0 0", fontSize: "32px", fontWeight: "bold" }}>
          {customer.balance} бонусов
        </p>
      </div>

      <div style={{ touchAction: "pan-y" }}>
        <div style={styles.qrContainer}>
          <QRCodeSVG
            value={JSON.stringify({ clientId: customer.id })}
            width="100%"
            height="100%"
          />
          <p style={{ color: "#888", fontSize: "14px", marginTop: "15px" }}>
            Покажите этот код кассиру
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
