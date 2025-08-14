import React from "react";

interface WalletTransaction {
  id: number;
  type: "credit" | "debit";
  description: string;
  purchaseAmount: string | null;
  cashbackPercent: string | null;
  cashbackAmount: string;
  createdAt: string;
}

interface Props {
  transactions: WalletTransaction[];
  loading: boolean;
}

const TransactionView: React.FC<{ tx: WalletTransaction }> = ({ tx }) => {
  const isCredit = tx.type === "credit";
  const amountSign = isCredit ? "+" : "-";
  const amountColor = isCredit ? "#2ecc71" : "#e74c3c";
  const txTitle = isCredit ? `Покупка ${tx.purchaseAmount}` : "Списание";

  return (
    <div
      key={tx.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        background: "#fff",
        fontSize: "16px",
        borderRadius: 10,
        border: "2px solid #d4af37",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500 }}>{txTitle}</div>
        <div style={{ fontSize: "12px", color: "#777" }}>
          {new Date(tx.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          color: amountColor,
          minWidth: "60px",
          textAlign: "right",
        }}
      >
        {amountSign}
        {tx.cashbackAmount}
      </div>
    </div>
  );
};

const WalletTransactionsList: React.FC<Props> = ({ transactions, loading }) => {
  if (loading) return <p>Загрузка транзакций...</p>;
  if (transactions.length === 0)
    return (
      <p style={{ fontSize: "14px", color: "#999" }}>Транзакций пока нет</p>
    );

  const groupedByDate = transactions.reduce((acc, tx) => {
    const day = new Date(tx.createdAt).toLocaleDateString();
    if (!acc[day]) acc[day] = [];
    acc[day].push(tx);
    return acc;
  }, {} as Record<string, WalletTransaction[]>);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {Object.entries(groupedByDate).map(([date, txs]) => (
        <div key={date}>
          <h3 style={{ margin: "0 0 10px" }}>{date}</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {txs.map((tx) => (
              <TransactionView tx={tx} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WalletTransactionsList;
