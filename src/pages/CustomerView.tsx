import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import type { Wallet, Transaction } from "../types";
import { formatDate } from "../utils/formatDate";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const styles = {
  container: { padding: "20px", userSelect: "none" },
  swipeNav: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
  },
  navItem: {
    padding: "5px 10px",
    color: "#aaa",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 18,
    textTransform: "uppercase",
  },
  activeNavItem: { color: "#007AFF", borderBottom: "2px solid #007AFF" },
  digitalCard: {
    backgroundColor: "#007AFF",
    color: "white",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0, 122, 255, 0.2)",
    marginBottom: "20px",
  },
  cardTitle: { margin: 0, opacity: 0.8, fontSize: "16px" },
  cardBalance: { margin: "8px 0 20px", fontSize: "36px", fontWeight: "bold" },
  qrContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    display: "inline-block",
  },
  transactionList: { listStyle: "none", padding: 0 },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 5px",
    borderBottom: "1px solid #f0f0f0",
  },
  loader: {
    textAlign: "center",
    padding: "50px",
    fontSize: "20px",
    color: "#888",
  },
} as const;

const TransactionHistory: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  return (
    <div>
      <ul style={styles.transactionList}>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
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

// --- Основной компонент ---
const CustomerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"card" | "history">("card");
  const { shopId } = useParams<{ shopId: string }>();

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useSelector((state: RootState) => state.client);

  useEffect(() => {
    if (!shopId || !user) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const walletResponse = await axios.get(
          `https://d10271f8f0e4.ngrok-free.app/wallets/${user.id}`,
          {
            // headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
          }
        );
        setWallet(walletResponse.data);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить информацию. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shopId, user]);

  const handlers = useSwipeable({
    onSwipedLeft: () => setActiveTab("history"),
    onSwipedRight: () => setActiveTab("card"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (loading) {
    return <div style={styles.loader}>Загрузка...</div>;
  }

  if (error) {
    return <div style={{ ...styles.loader, color: "red" }}>{error}</div>;
  }

  console.log("wallet: ", wallet);

  if (!wallet) {
    return <div style={styles.loader}>Нет данных для отображения.</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.swipeNav}>
        <div
          style={
            activeTab === "card"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setActiveTab("card")}
        >
          Карта
        </div>
        <div
          style={
            activeTab === "history"
              ? { ...styles.navItem, ...styles.activeNavItem }
              : styles.navItem
          }
          onClick={() => setActiveTab("history")}
        >
          История
        </div>
      </div>

      <div {...handlers} style={{ touchAction: "pan-y" }}>
        {activeTab === "card" && (
          <div style={styles.digitalCard}>
            <p style={styles.cardTitle}>Баланс в "{wallet.shop.name}"</p>
            <p style={styles.cardBalance}>{wallet.balance} бонусов</p>
            <div style={styles.qrContainer}>
              <QRCodeSVG
                value={JSON.stringify({
                  walletId: wallet.id,
                })}
                size={180}
              />
            </div>
            <p style={{ fontSize: "14px", marginTop: "20px", opacity: 0.9 }}>
              Покажите этот код кассиру
            </p>
          </div>
        )}

        {activeTab === "history" && (
          <TransactionHistory transactions={transactions} />
        )}
      </div>
    </div>
  );
};

export default CustomerView;
