import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import type { Wallet } from "../../types";
import WalletHeader from "./WalletHeader";
import WalletTabs from "./WalletTabs";
import WalletQRCodeView from "./WalletQRCodeView";
import WalletTransactionsList from "./WalletTransactionsList";
import DateRangePicker from "./DateRangePicker";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  type: "in" | "out";
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const WalletInfoPage: React.FC = () => {
  const { walletId } = useParams();
  const [activeTab, setActiveTab] = useState<"qr" | "tx">("qr");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [loadingTx, setLoadingTx] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Даты по умолчанию: сегодня и неделю назад
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState<string>(formatDate(weekAgo));
  const [endDate, setEndDate] = useState<string>(formatDate(today));

  const getWallet = async () => {
    try {
      setLoadingWallet(true);
      const res = await axios.get(
        `https://d10271f8f0e4.ngrok-free.app/wallets/${walletId}`
      );
      setWallet(res.data);
    } catch {
      setError("Не удалось загрузить данные кошелька");
    } finally {
      setLoadingWallet(false);
    }
  };

  const getWalletTransactions = async (
    start: string = startDate,
    end: string = endDate
  ) => {
    try {
      setLoadingTx(true);
      const res = await axios.get(
        `https://d10271f8f0e4.ngrok-free.app/wallets/${walletId}/transactions`,
        {
          params: {
            startDate: start,
            endDate: end,
          },
        }
      );
      setTransactions(res.data);
    } catch {
      setError("Не удалось загрузить транзакции");
    } finally {
      setLoadingTx(false);
    }
  };

  // Загружаем кошелек при смене id
  useEffect(() => {
    if (walletId) getWallet();
  }, [walletId]);

  // Загружаем транзакции при первом заходе на вкладку "tx" или при смене дат
  useEffect(() => {
    if (activeTab === "tx") {
      getWalletTransactions();
    }
  }, [activeTab, startDate, endDate]);

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {wallet && <WalletHeader wallet={wallet} />}
      <WalletTabs activeTab={activeTab} onChange={setActiveTab} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {activeTab === "qr" && (
        <WalletQRCodeView wallet={wallet} loading={loadingWallet} />
      )}
      {activeTab === "tx" && (
        <>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(s, e) => {
              setStartDate(s);
              setEndDate(e);
              getWalletTransactions(s, e);
            }}
          />
          <WalletTransactionsList
            transactions={transactions}
            loading={loadingTx}
          />
        </>
      )}
    </div>
  );
};

export default WalletInfoPage;
