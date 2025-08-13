import React from "react";

const WalletCardSkeleton: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f8f5ee",
        padding: "15px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(51, 91, 69, 0.15)",
        border: "1px solid #d4af37",
        gap: "20px",
        animation: "pulse 1.5s infinite ease-in-out",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#e0e0e0",
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: "18px",
            width: "50%",
            backgroundColor: "#e0e0e0",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
        />
        <div
          style={{
            height: "15px",
            width: "30%",
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
};

export default WalletCardSkeleton;
