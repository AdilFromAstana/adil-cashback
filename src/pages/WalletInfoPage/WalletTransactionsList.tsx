import React from "react";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: "in" | "out";
}

interface Props {
  transactions: Transaction[];
  loading: boolean;
}

const WalletTransactionsList: React.FC<Props> = ({ transactions, loading }) => {
  if (loading) return <p>Загрузка транзакций...</p>;
  if (transactions.length === 0)
    return (
      <p style={{ fontSize: "14px", color: "#999" }}>Транзакций пока нет</p>
    );

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {transactions.map((tx) => (
        <li
          key={tx.id}
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: tx.type === "in" ? "#2e7d32" : "#c62828",
            }}
          >
            {tx.type === "in" ? "+" : "-"}
            {tx.amount} USDT
          </span>
          <span style={{ fontSize: "12px", color: "#888" }}>
            {new Date(tx.date).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default WalletTransactionsList;
