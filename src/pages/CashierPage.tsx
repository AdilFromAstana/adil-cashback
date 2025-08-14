import React, { useEffect, useRef, useState } from "react";
// import QrScanner from "qr-scanner";
import type { Wallet } from "../types";
import { TransactionView } from "./cashier/TransactionView";
import api from "../api/axiosInstance";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  confirmationMessage: {
    padding: "15px",
    borderRadius: "8px",
    backgroundColor: "#43A047",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
  },
};

const CashierPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const scannerRef = useRef<QrScanner | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [showScanner] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  // === QR логика временно закомментирована ===
  /*
  useEffect(() => {
    if (!showScanner) return;

    const initScanner = async () => {
      if (!videoRef.current) return;

      scannerRef.current = new QrScanner(
        videoRef.current,
        async (result) => {
          try {
            const parsed = JSON.parse(result.data);
            if (parsed.walletId) {
              await fetchWallet(parsed.walletId);
              setShowScanner(false);
              scannerRef.current?.stop();
            }
          } catch (err) {
            console.log("QR не содержит walletId", err);
          }
        },
        { highlightScanRegion: true, highlightCodeOutline: true }
      );

      try {
        await scannerRef.current.start();
      } catch (err) {
        console.error("Ошибка доступа к камере", err);
      }
    };

    initScanner();

    return () => {
      scannerRef.current?.stop();
    };
  }, [showScanner]);
  */

  useEffect(() => {
    fetchWallet(1);
  }, []);

  const fetchWallet = async (walletId: number) => {
    try {
      const response = await api.get(`/wallets/${walletId}`);
      setSelectedWallet(response.data);
    } catch (err) {
      console.error("Ошибка получения кошелька", err);
      alert("Кошелек не найден");
    }
  };

  const handleTransactionComplete = (message: string) => {
    setConfirmation(message);
    setTimeout(() => setConfirmation(""), 3000);
    // Обновляем баланс после операции
    if (selectedWallet) fetchWallet(selectedWallet.id);
  };

  return (
    <div style={styles.container}>
      {confirmation && (
        <div style={styles.confirmationMessage}>{confirmation}</div>
      )}

      {selectedWallet ? (
        <TransactionView
          wallet={selectedWallet}
          onComplete={handleTransactionComplete}
          onChangeWallet={() => setSelectedWallet(null)}
        />
      ) : (
        <div>
          {/* QR-сканер временно скрыт */}
          {showScanner && (
            <video
              ref={videoRef}
              style={{
                width: "100%",
                maxWidth: 400,
                border: "2px solid #ccc",
                borderRadius: 8,
                marginTop: 20,
              }}
            />
          )}
          {!showScanner && <p>Загрузка кошелька...</p>}
        </div>
      )}
    </div>
  );
};

export default CashierPage;
