import React from "react";

interface Props {
  activeTab: "qr" | "tx";
  onChange: (tab: "qr" | "tx") => void;
}

const baseTab = {
  fontSize: "14px",
  flex: 1,
  textAlign: "center" as const,
  padding: "10px",
  margin: "4px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  opacity: 0.5,
  borderRadius: "10px",
  color: "white",
};

const activeTabStyle = {
  opacity: 1,
  color: "#335b45",
  backgroundColor: "#d4af37",
};

const WalletTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        border: "2px solid #d4af37",
        borderRadius: "10px",
      }}
    >
      <div
        style={{ ...baseTab, ...(activeTab === "qr" ? activeTabStyle : {}) }}
        onClick={() => onChange("qr")}
      >
        QR-код
      </div>
      <div
        style={{ ...baseTab, ...(activeTab === "tx" ? activeTabStyle : {}) }}
        onClick={() => onChange("tx")}
      >
        Транзакции
      </div>
    </div>
  );
};

export default WalletTabs;
