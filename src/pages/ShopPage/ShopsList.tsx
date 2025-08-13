import React from "react";
import ShopItem from "./ShopItem";

type Shop = {
  id: number;
  name: string;
  imageUrl?: string;
};

interface ShopsListProps {
  shops: Shop[];
}

const ShopsList: React.FC<ShopsListProps> = ({ shops }) => {
  if (shops.length === 0) return <div>Магазины не найдены</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {shops.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </div>
  );
};

export default ShopsList;
