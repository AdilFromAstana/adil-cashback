import React from "react";
import ShopItem from "./ShopItem";
import type { Shop } from "../../types";

interface ShopsListProps {
  shops: Shop[];
  handleSelectShop: (shop: Shop) => void;
}

const ShopsList: React.FC<ShopsListProps> = ({ shops, handleSelectShop }) => {
  if (shops.length === 0) return <div>Магазины не найдены</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {shops.map((shop) => (
        <ShopItem
          key={shop.id}
          shop={shop}
          handleSelectShop={handleSelectShop}
        />
      ))}
    </div>
  );
};

export default ShopsList;
