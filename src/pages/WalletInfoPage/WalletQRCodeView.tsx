import React from "react";
import QRCode from "react-qr-code";
import type { Wallet } from "../../types";

interface Props {
  wallet: Wallet | null;
  loading: boolean;
}

const WalletQRCodeView: React.FC<Props> = ({ wallet, loading }) => {
  if (loading) return <p>Загрузка...</p>;
  if (!wallet) return <p>Нет данных о кошельке</p>;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {wallet.id && <QRCode value={wallet.id} width="100%" />}
    </div>
  );
};

export default WalletQRCodeView;
