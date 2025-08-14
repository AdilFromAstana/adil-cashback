import React from "react";
import { useNavigate } from "react-router-dom";
import type { Wallet } from "../../types";

interface WalletCardProps {
  wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({ wallet }) => {
  const nav = useNavigate();

  return (
    <div
      onClick={() => nav(`/wallets/${wallet.id}`)}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8f5ee",
        padding: "15px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(51, 91, 69, 0.15)",
        border: "1px solid #d4af37",
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {
        <img
          src={
            wallet.shop.imageUrl ||
            "https://static.vecteezy.com/system/resources/previews/013/043/580/non_2x/store-icon-template-vector.jpg"
          }
          alt={wallet.shop.name}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "20px",
            boxShadow: "0 2px 6px rgba(51, 91, 69, 0.4)",
            border: "2px solid #335b45",
          }}
        />
      }
      <div style={{ flex: 1 }}>
        <h2
          style={{
            margin: "0 0 5px",
            fontSize: "18px",
            color: "#335b45",
          }}
        >
          {wallet.shop.name}
        </h2>
        <p style={{ margin: 0, fontSize: "15px", color: "#2e4632" }}>
          Бонусы:{" "}
          <span style={{ fontWeight: "700", color: "#335b45" }}>
            {wallet.balance}
          </span>
        </p>
      </div>
    </div>
  );
};

export default WalletCard;
