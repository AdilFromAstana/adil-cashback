import React, { useEffect, useState } from "react";
import type { Wallet } from "../../types";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import WalletCard from "./WalletCard";
import WalletCardSkeleton from "./WalletCardSkeleton";
import api from "../../api/axiosInstance";

const WalletsPage: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useSelector((state: RootState) => state.client);

  useEffect(() => {
    if (!user) return;

    const fetchWallets = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/wallets/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setWallets(res.data);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить информацию о кошельках.");
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, [user?.id]);

  return (
    <div style={{ padding: "20px", height: "100%" }}>
      <div
        style={{
          marginBottom: "20px",
          color: "#d4af37",
          fontWeight: "700",
          lineHeight: 1,
          fontSize: 32,
        }}
      >
        Мои кошельки
      </div>

      {error && <div style={{ color: "#d4af37" }}>{error}</div>}

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {[...Array(3)].map((_, i) => (
            <WalletCardSkeleton key={i} />
          ))}
        </div>
      ) : wallets.length === 0 ? (
        <div style={{ color: "#d4af37", fontStyle: "italic" }}>
          У вас пока нет кошельков.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {wallets.map((wallet) => (
            <WalletCard key={wallet.id} wallet={wallet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletsPage;
