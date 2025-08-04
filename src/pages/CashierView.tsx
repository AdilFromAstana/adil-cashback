import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { clients } from "../mockData";
import type { Business, Client } from "../types";
import { FindClientView } from "./cashier/FindClientView";
import { TransactionView } from "./cashier/TransactionView";

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

type CashierViewProps = {
  business: Business;
};

const CashierView: React.FC<CashierViewProps> = ({ business }) => {
  const [phone, setPhone] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    // ... (useEffect для сканера остается здесь, так как он управляет состоянием этого компонента)
    if (!showScanner) return;
    const scanner = new Html5QrcodeScanner(
      "qr-scanner-region",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    const onScanSuccess = (decodedText: string) => {
      try {
        const parsedData = JSON.parse(decodedText);
        if (parsedData.clientId) {
          const found = clients.find((c) => c.id === parsedData.clientId);
          if (found) {
            setSelectedClient(found);
            setShowScanner(false);
            scanner.clear();
          }
        }
      } catch (e) {}
    };
    scanner.render(onScanSuccess, undefined);
    return () => {
      scanner.clear().catch((err) => {
        console.log(err);
      });
    };
  }, [showScanner]);

  const findClientByPhone = () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const found = clients.find((c) => c.phone.includes(cleanPhone.slice(-10)));
    found ? setSelectedClient(found) : alert("Клиент не найден");
  };

  const handleTransactionComplete = (message: string) => {
    setConfirmation(message);
    setTimeout(() => setConfirmation(""), 3000);
    setSelectedClient(null);
    setPhone("");
  };

  return (
    <div style={styles.container}>
      {confirmation && (
        <div style={styles.confirmationMessage}>{confirmation}</div>
      )}

      {selectedClient ? (
        <TransactionView
          client={selectedClient}
          business={business}
          onComplete={handleTransactionComplete}
          onChangeClient={() => setSelectedClient(null)}
        />
      ) : (
        <FindClientView
          phone={phone}
          onPhoneChange={setPhone}
          onFindByPhone={findClientByPhone}
          onShowScanner={() => setShowScanner(!showScanner)}
          showScanner={showScanner}
        />
      )}
    </div>
  );
};

export default CashierView;
