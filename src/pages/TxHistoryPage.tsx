import { transactions } from "../mockData";
import type { Client } from "../types";
import { formatDate } from "../utils/formatDate";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "0px 20px", userSelect: "none" },
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
  transactionList: { listStyle: "none", padding: 0 },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
  },
};

type TxHistoryPageProps = {
  customer: Client;
};

const TxHistoryPage: React.FC<TxHistoryPageProps> = ({ customer }) => {
  const customerTransactions = transactions
    .filter((t) => t.clientId === customer.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div style={styles.container}>
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
export default TxHistoryPage;
