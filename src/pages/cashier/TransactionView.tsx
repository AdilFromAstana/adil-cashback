import React, { useState } from "react";
import type { Wallet } from "../../types";
import Button from "../../component/Button";
import Input from "../../component/Input";
import BottomSheet from "../../component/BottomSheet";
import api from "../../api/axiosInstance";

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
  wallet: Wallet;
  onComplete: (message: string) => void;
  onChangeWallet: () => void;
};

export const TransactionView: React.FC<TransactionViewProps> = ({
  wallet,
  onComplete,
  onChangeWallet,
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [sheetState, setSheetState] = useState<"closed" | "accrue" | "redeem">(
    "closed"
  );
  const [balance, setBalance] = useState(parseFloat(wallet.balance));

  const calculatedCashback = Math.floor(
    (parseFloat(purchaseAmount) || 0) * (wallet.shop.cashbackPercent / 100)
  );

  const handleAccrue = async () => {
    const amount = parseFloat(purchaseAmount);
    if (!amount || amount <= 0) return alert("Введите корректную сумму");

    try {
      const response = await api.post("/wallets/credit", {
        walletId: wallet.id,
        userId: wallet.user.id,
        shopId: wallet.shop.id,
        purchaseAmount: amount,
        description: "Начисление бонусов",
      });

      const newBalance = parseFloat(response.data.wallet.balance); // <- берём из wallet
      setBalance(newBalance);

      onComplete(
        `Начислено: ${calculatedCashback}. Новый баланс: ${newBalance}`
      );

      setSheetState("closed");
      setPurchaseAmount("");
    } catch (err) {
      console.error(err);
      alert("Ошибка при начислении бонусов");
    }
  };

  const handleRedeem = async () => {
    const redeem = parseFloat(redeemAmount);
    if (!redeem || redeem <= 0) return alert("Введите корректную сумму");
    if (redeem > balance) return alert("Недостаточно бонусов");

    try {
      const response = await api.post("/wallets/debit", {
        walletId: wallet.id,
        userId: wallet.user.id,
        shopId: wallet.shop.id,
        cashbackAmount: redeem,
        description: "Списание бонусов",
      });

      const newBalance = parseFloat(response.data.wallet.balance); // <- исправлено
      setBalance(newBalance);
      onComplete(`Списано: ${redeem}. Новый баланс: ${newBalance}`);
      setSheetState("closed");
      setRedeemAmount("");
    } catch (err) {
      console.error(err);
      alert("Ошибка при списании бонусов");
    }
  };

  return (
    <div>
      <div style={styles.clientInfoCard}>
        <p style={{ margin: 0, fontWeight: "bold", fontSize: "20px" }}>
          {wallet.user.name || wallet.user.email}
        </p>
        <p style={{ margin: "8px 0 0", color: "#666", fontSize: "18px" }}>
          Баланс: {balance.toFixed(2)} бонусов
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
        onClick={onChangeWallet}
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
          onClick={() => setRedeemAmount(balance.toString())}
          type="secondary"
          style={{ marginBottom: "15px", background: "#eee", color: "#333" }}
        >
          Списать всё ({balance.toFixed(2)} бонусов)
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
