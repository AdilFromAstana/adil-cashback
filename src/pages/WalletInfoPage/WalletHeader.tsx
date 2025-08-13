import React from "react";
import Arrow from "../../component/Arrow";
import { useNavigate } from "react-router-dom";
import type { Wallet } from "../../types";

interface Props {
  wallet: Wallet;
}

const WalletHeader: React.FC<Props> = ({ wallet }) => {
  const nav = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          color: "#d4af37",
        }}
      >
        <button
          onClick={() => nav("/wallets")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "transparent",
            border: "none",
            color: "#d4af37",
            padding: 0,
            fontSize: 14,
          }}
        >
          <Arrow direction="up" color="#d4af37" />
          <span>Мои кошельки</span>
        </button>
        <label style={{ fontSize: "32px", lineHeight: 1 }}>
          {wallet.shop.name}
        </label>
        <div>
          <div>Доступно</div>
          <b style={{ fontSize: "10vw" }}>{wallet.balance} т.</b>
        </div>
      </div>

      <img
        src={wallet.shop.imageUrl}
        alt={wallet.shop.name}
        style={{
          width: "25vw",
          height: "25vw",
          borderRadius: "100%",
          aspectRatio: "1/1",
        }}
      />
    </div>
  );
};

export default WalletHeader;
