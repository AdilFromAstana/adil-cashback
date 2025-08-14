import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Wallet } from "../../types";
import WalletHeader from "./WalletHeader";
import WalletTabs from "./WalletTabs";
import WalletQRCodeView from "./WalletQRCodeView";
import WalletTransactionsList from "./WalletTransactionsList";
import DateRangePicker from "./DateRangePicker";
import api from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { clientTransactions } from "../../store/slices/clientSlice";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const WalletInfoPage: React.FC = () => {
  const { walletId } = useParams();
  const [activeTab, setActiveTab] = useState<"qr" | "tx">("qr");
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [loadingTx, setLoadingTx] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { transactions } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch();

  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const [startDate, setStartDate] = useState<string>(formatDate(weekAgo));
  const [endDate, setEndDate] = useState<string>(formatDate(today));

  const getWallet = async () => {
    try {
      setLoadingWallet(true);
      const res = await api.get(`/wallets/${walletId}`);
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
      const res = await api.get(`/wallets/${walletId}/transactions`, {
        params: {
          startDate: start,
          endDate: end,
        },
      });
      dispatch(clientTransactions(res.data));
    } catch {
      setError("Не удалось загрузить транзакции");
    } finally {
      setLoadingTx(false);
    }
  };

  useEffect(() => {
    if (walletId) getWallet();
  }, [walletId]);

  useEffect(() => {
    getWalletTransactions();
  }, [startDate, endDate]);

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
