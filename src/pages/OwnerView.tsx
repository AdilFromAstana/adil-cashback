import React, { useState } from "react";
import type { Business, Client } from "../types";
import CashierView from "./CashierView";

// Пропсы теперь не содержат onLogout
type OwnerViewProps = {
  business: Business;
  clients: Client[];
};

// Стили немного упрощаются
const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  modeSwitcher: {
    display: "flex",
    borderRadius: "8px",
    backgroundColor: "#eee",
    padding: "4px",
    margin: "0 auto 20px auto",
    width: "fit-content",
  },
  modeButton: {
    padding: "8px 16px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontWeight: "500",
    color: "#555",
    borderRadius: "6px",
  },
  activeMode: {
    backgroundColor: "#fff",
    color: "#007AFF",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  clientList: { listStyle: "none", padding: 0 },
  clientItem: {
    backgroundColor: "#f9f9f9",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clientName: { fontWeight: "bold" },
  clientBalance: { color: "#007AFF", fontWeight: "bold" },
  settings: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "8px",
  },
  swipeNav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
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
};

const OwnerView: React.FC<OwnerViewProps> = ({ business, clients }) => {
  const [mode, setMode] = useState<"dashboard" | "cashier">("dashboard");

  return (
    <div>
      <div style={styles.swipeNav}>
        <div
          style={
            mode === "dashboard"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setMode("dashboard")}
        >
          Панель
        </div>
        <div
          style={
            mode === "cashier"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setMode("cashier")}
        >
          Касса
        </div>
      </div>

      {mode === "dashboard" ? (
        <div style={styles.container}>
          <h3>База клиентов</h3>
          <ul style={styles.clientList}>
            {clients
              .filter((c) => c.businessId === business.id)
              .map((client) => (
                <li key={client.id} style={styles.clientItem}>
                  <div>
                    <div style={styles.clientName}>{client.name}</div>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      +{client.phone}
                    </div>
                  </div>
                  <div style={styles.clientBalance}>
                    {client.balance} бонусов
                  </div>
                </li>
              ))}
          </ul>
          <div style={styles.settings}>
            <h3>Настройки</h3>
            <p>
              Процент кэшбэка: <strong>{business.cashbackPercentage}%</strong>
            </p>
            <p>
              Логин кассира: <strong>{business.cashierLogin}</strong>
            </p>
          </div>
        </div>
      ) : (
        // onLogout здесь не нужен, так как хедер теперь общий
        <CashierView business={business} />
      )}
    </div>
  );
};

export default OwnerView;
