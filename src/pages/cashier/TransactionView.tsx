import React, { useState } from "react";
import type { Business, Client } from "../../types";
import Button from "../../component/Button";
import Input from "../../component/Input";
import BottomSheet from "../../component/BottomSheet";

const styles = {
  clientInfoCard: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
  },
  actionsContainer: { display: "flex", gap: "15px", marginTop: "20px" },
  sheetTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  sheetCalculations: {
    textAlign: "center",
    margin: "15px 0",
    fontSize: "18px",
  },
} as const;

type TransactionViewProps = {
  client: Client;
  business: Business;
  onComplete: (message: string) => void;
  onChangeClient: () => void;
};

export const TransactionView: React.FC<TransactionViewProps> = ({
  client,
  business,
  onComplete,
  onChangeClient,
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [sheetState, setSheetState] = useState<"closed" | "accrue" | "redeem">(
    "closed"
  );

  const calculatedCashback = Math.floor(
    (parseFloat(purchaseAmount) || 0) * (business.cashbackPercentage / 100)
  );

  const handleAccrue = () => {
    const cashback = calculatedCashback;
    const newBalance = client.balance + cashback;
    onComplete(`Начислено: ${cashback}. Новый баланс: ${newBalance}`);
  };

  const handleRedeem = () => {
    // ... (логика списания, такая же как была)
    const redeem = parseFloat(redeemAmount);
    if (redeem > client.balance) {
      alert("Недостаточно бонусов!");
      return;
    }
    const newBalance = client.balance - redeem;
    // updateClientBalance(client.id, newBalance);
    onComplete(`Списано: ${redeem}. Новый баланс: ${newBalance}`);
  };

  return (
    <div>
      <div style={styles.clientInfoCard}>
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
          {client.name}
        </p>
        <p style={{ margin: "8px 0 0", color: "#666", fontSize: "18px" }}>
          Баланс: {client.balance} бонусов
        </p>
      </div>
      <div style={styles.actionsContainer}>
        <Button
          onClick={() => setSheetState("accrue")}
          type="primary"
          style={{ backgroundColor: "#43A047" }}
        >
          Начислить
        </Button>
        <Button
          onClick={() => setSheetState("redeem")}
          type="secondary"
          style={{ backgroundColor: "#E53935" }}
        >
          Списать
        </Button>
      </div>
      <button
        onClick={onChangeClient}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#888",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Сменить клиента
      </button>

      <BottomSheet
        isOpen={sheetState === "accrue"}
        onClose={() => setSheetState("closed")}
      >
        <h3 style={styles.sheetTitle}>Начисление бонусов</h3>
        <Input
          type="tel"
          placeholder="Введите сумму чека, тг"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
        />
        <div style={styles.sheetCalculations}>
          Будет начислено: <strong>{calculatedCashback} бонусов</strong>
        </div>
        <Button onClick={handleAccrue} style={{ backgroundColor: "#43A047" }}>
          Подтвердить начисление
        </Button>
      </BottomSheet>

      <BottomSheet
        isOpen={sheetState === "redeem"}
        onClose={() => setSheetState("closed")}
      >
        <h3 style={styles.sheetTitle}>Списание бонусов</h3>
        <Button
          onClick={() => setRedeemAmount(String(client.balance || 0))}
          type="secondary"
          style={{ marginBottom: "15px", background: "#eee", color: "#333" }}
        >
          Списать всё ({client.balance} бонусов)
        </Button>
        <Input
          type="tel"
          placeholder="Введите сумму списания"
          value={redeemAmount}
          onChange={(e) => setRedeemAmount(e.target.value)}
        />
        <Button onClick={handleRedeem} style={{ backgroundColor: "#E53935" }}>
          Подтвердить списание
        </Button>
      </BottomSheet>
    </div>
  );
};
