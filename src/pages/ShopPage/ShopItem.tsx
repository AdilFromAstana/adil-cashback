import React from "react";

type Shop = {
  id: number;
  name: string;
  imageUrl?: string;
};

interface ShopItemProps {
  shop: Shop;
}

const ShopItem: React.FC<ShopItemProps> = ({ shop }) => {
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
        transition: "transform 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {shop.imageUrl && (
        <img
          src={shop.imageUrl}
          alt={shop.name}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 20,
            boxShadow: "0 2px 6px rgba(51, 91, 69, 0.4)",
            border: "2px solid #335b45",
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <h2 style={{ margin: "0 0 5px", fontSize: 18, color: "#335b45" }}>
          {shop.name}
        </h2>
      </div>
    </div>
  );
};

export default ShopItem;
